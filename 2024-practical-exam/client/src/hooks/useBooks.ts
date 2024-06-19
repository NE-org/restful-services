/* eslint-disable @typescript-eslint/no-explicit-any */
import { BookState } from "@/store"
import { http } from "@/utils/http-common"
import { IBooks } from "@/utils/types"
import { notification } from "antd"
import { useRecoilState } from "recoil"
import useSWR from "swr"

const useBooks = (callback?: (data: unknown) => void) => {
    const [, setBookState] = useRecoilState(BookState)

    const fetcher = (url: string) => http.get(url).then((res) => {
        console.log(res)
        return res.data.body

    })

    const { data, error, mutate } = useSWR<IBooks[], Error>('/books', fetcher, {
        onSuccess: (data: any) => {
            console.log(data)
            setBookState(data)
            if (callback) callback(data)
        },
        onError: (error) => {
            console.error('Error fetching books:', error)
        }
    })

    const updateBooks = async (book: IBooks) => {
        console.log('reached here')
        if (!data) {
            return false;
        }
        console.log('Updating book:', book);

        try {
            const data = await http.put(
                `/books/${book.id}`,
                book
            );

            const updateBook = data.data?.body;
            mutate((currentData: IBooks[] | undefined) => {
                if (!currentData) {
                    return [];
                }

                return currentData.map(
                    (u: IBooks) => u.id === updateBook.id ? updateBook : u
                )
            })
            notification.success({
                message: 'Book updated successfully!',
            });

            return updateBook;
        } catch (error: any) {
            notification.error({
                message: 'Error updating book',
                description: error.message
            });
            return null;
        }
    };

    const deleteBook = async (id: string) => {
        if (!data) {
            return false;
        }
        await http.delete(`/books/${id}`);
        mutate(data.filter((book) => book.id !== id), false);
    };

    return {
        books: data,
        mutate,
        error,
        updateBooks,
        deleteBook
    }
}

export default useBooks