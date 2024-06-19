import * as crypto from 'crypto'

const hashString = (input: string, algorithm: string = 'sha256'): string => {
    const hash = crypto.createHash(algorithm)
    hash.update(input)
    return hash.digest('hex')
}
export { hashString }