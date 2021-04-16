interface ByteOrderedBuffer {
	buffer: Buffer,
	methods: Methods,
	writeOffset: number,
	readOffset: number,
	resize: () => void
}

type WriteMethod<T> = (buffer: ByteOrderedBuffer, value: T) => void
type ReadMethod<T> = (buffer: ByteOrderedBuffer) => T
type Nullable<T> = T | undefined | null

interface WriteMethods {
	write(buffer: ByteOrderedBuffer, value: any, writeType?: boolean): void
	writeByte: WriteMethod<number>
	writeShort: WriteMethod<number>
	writeInt: WriteMethod<number>
	writeFloat: WriteMethod<number>
	writeDouble: WriteMethod<number>
	writeLong: WriteMethod<bigint>

	writeNull: WriteMethod<null>
	writeBoolean: WriteMethod<boolean>
	writeString: WriteMethod<Nullable<string>>
	writeBytes: WriteMethod<Nullable<Buffer>>
	writeArray: WriteMethod<Nullable<Array<any>>>
	writeMap: WriteMethod<Nullable<Map<string | number, any>>>
	writeObject: WriteMethod<Nullable<any>>
}

interface ReadMethods {
	read(buffer: ByteOrderedBuffer): any
	readByte: ReadMethod<number>
	readShort: ReadMethod<number>
	readInt: ReadMethod<number>
	readFloat: ReadMethod<number>
	readDouble: ReadMethod<number>
	readLong: ReadMethod<bigint>

	readNull: ReadMethod<null>
	readBoolean: ReadMethod<boolean>
	readString: ReadMethod<Nullable<string>>
	readBytes: ReadMethod<Nullable<Buffer>>
	readArray: ReadMethod<Nullable<Array<any>>>
	readMap: ReadMethod<Nullable<Map<string, any>>>
	readObject: ReadMethod<Nullable<any>>
}

interface Methods extends WriteMethods, ReadMethods {
	invert(): Methods
}

export {
	ByteOrderedBuffer,
	WriteMethod,
	ReadMethod,
	WriteMethods,
	ReadMethods,
	Methods,
	Nullable
}