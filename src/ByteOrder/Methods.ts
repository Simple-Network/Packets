type ByteOrderedBuffer = Buffer & { methods: WriteMethods }
type WriteMethod<T> = (buffer: ByteOrderedBuffer, value: T, offset: number) => number

interface WriteMethods {
	write(buffer: ByteOrderedBuffer, value: any, offset: number, writeType?: boolean): number
	writeByte: WriteMethod<number>
	writeShort: WriteMethod<number>
	writeInt: WriteMethod<number>
	writeFloat: WriteMethod<number>
	writeDouble: WriteMethod<number>
	writeLong: WriteMethod<bigint>

	writeNull: WriteMethod<null>
	writeBoolean: WriteMethod<boolean>
	writeString: WriteMethod<string>
	writeArray: WriteMethod<Array<any>>
	writeObject: WriteMethod<any | Map<string | number, any>>
}

interface Methods extends WriteMethods {
	invert(): Methods
}

export {
	ByteOrderedBuffer,
	WriteMethod,
	WriteMethods,
	Methods
}