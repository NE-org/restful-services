import { Book } from '@prisma/client'
import { ServiceAPIResponse } from '../../types/service-response'
import { IBooks } from '../../types/types'
import { bookSchema, handleExceptionError, prisma } from '../utils/prisma'

const create = async (
    book: IBooks,
): Promise<ServiceAPIResponse<Book>> => {
    try {
        await bookSchema.validate(book, { abortEarly: false })
        const newBook = await prisma.book.create(
            {
                data: {
                    name: book.name,
                    author: book.author,
                    publisher: book.publisher,
                    publicationYear: book.publicationYear,
                    subject: book.subject,
                }
            }
        )

        if (!newBook) {
            return {
                statusCode: 404,
                body: {} as Book,
                message: 'Book not found',
            }
        }

        return {
            statusCode: 201,
            body: newBook,
            message: 'Book created successfully',
        }
    } catch (error: any) {
        const { statusCode, message } = handleExceptionError(error)
        return {
            statusCode,
            body: {} as Book,
            message,
        }
    }
}

const getAll = async (): Promise<ServiceAPIResponse<IBooks[]>> => {
    try {
        const books = await prisma.book.findMany()
        console.log('The books: ', books)

        if (!books) {
            return {
                statusCode: 404,
                body: [],
                message: 'No books found',
            }
        }
        return {
            statusCode: 200,
            body: books,
            message: 'Books found !',
        }
    } catch (error: any) {
        const { statusCode, message } = handleExceptionError(error)
        return {
            statusCode,
            body: [],
            message,
        }
    }
}

const getBookById = async (id: string): Promise<ServiceAPIResponse<Book>> => {
    try {
        const book = await prisma.book.findUnique(
            {
                where: {
                    id,
                },
            }
        )
        if (!book) {
            return {
                statusCode: 404,
                body: {} as Book,
                message: 'No book found',
            }
        }
        return {
            statusCode: 200,
            body: book,
            message: 'Menu found',
        }
    } catch (error: any) {
        const { statusCode, message } = handleExceptionError(error)
        return {
            statusCode,
            body: {} as Book,
            message,
        }
    }
}

const removeBook = async (id: string): Promise<ServiceAPIResponse<Book>> => {
    try {
        const book = await prisma.book.findUnique(
            {
                where: {
                    id,
                },
            }
        )
        if (!book) {
            return {
                statusCode: 404,
                body: {} as Book,
                message: 'Book not found',
            }
        }
        await prisma.book.delete(
            {
                where: {
                    id,
                },
            }
        )
        return {
            statusCode: 200,
            body: book,
            message: 'Book deleted',
        }
    } catch (error: any) {
        const { statusCode, message } = handleExceptionError(error)
        return {
            statusCode,
            body: {} as Book,
            message,
        }
    }
}

const updateBook = async (id: string, book: IBooks): Promise<ServiceAPIResponse<Book | null>> => {
    try {
        const existingBook = await prisma.book.findUnique(
            {
                where: {
                    id,
                },
            }
        )
        if (!existingBook) {
            return {
                statusCode: 404,
                body: {} as Book,
                message: 'Book not found',
            }
        }

        const updatedBook = await prisma.book.update(
            {
                where: {
                    id,
                },
                data: {
                    name: book.name,
                    author: book.author,
                    publisher: book.publisher,
                    publicationYear: book.publicationYear,
                    subject: book.subject,
                },
            }
        )

        if (!updatedBook) {
            return {
                statusCode: 404,
                body: {} as Book,
                message: 'Book not found',
            }
        }

        return {
            statusCode: 200,
            body: updatedBook,
            message: 'Book updated',
        }
    } catch (error: any) {
        const { statusCode, message } = handleExceptionError(error)
        return {
            statusCode,
            body: {} as Book,
            message,
        }
    }
}

export { create, getAll, getBookById, removeBook, updateBook }
