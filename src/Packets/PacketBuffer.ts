import { NATIVE_ENDIAN } from "src/ByteOrder"
import { ByteOrderedBuffer, Methods, Nullable } from "src/ByteOrder/Methods"

export default class PacketBuffer {

	public static readonly DEFAULT_BUFFER_SIZE: number = 1024

	private _buffer: ByteOrderedBuffer

	constructor()
	constructor(data: number)
	constructor(data: Buffer, methods: Methods)
	constructor(data?: Buffer | number, methods?: Methods) {
		const buffer = typeof data == 'number' ? Buffer.alloc(data) : (data instanceof Buffer ? data : Buffer.alloc(PacketBuffer.DEFAULT_BUFFER_SIZE))

		this._buffer = {
			buffer,
			methods: methods || NATIVE_ENDIAN,
			writeOffset: 0,
			readOffset: 0,
			resize: this.resizeBuffer
		}
	}

	private resizeBuffer() {
		const newBuffer = Buffer.alloc(this._buffer.buffer.byteLength + PacketBuffer.DEFAULT_BUFFER_SIZE)

		this._buffer.buffer.copy(newBuffer, 0, 0, this._buffer.writeOffset)
		this._buffer.buffer = newBuffer
	}

	public writeByte(value: number) {
		this._buffer.methods.writeByte(this._buffer, value)
	}

	public writeShort(value: number) {
		this._buffer.methods.writeShort(this._buffer, value)
	}

	public writeInt(value: number) {
		this._buffer.methods.writeInt(this._buffer, value)
	}

	public writeLong(value: bigint) {
		this._buffer.methods.writeLong(this._buffer, value)
	}

	public writeFloat(value: number) {
		this._buffer.methods.writeFloat(this._buffer, value)
	}

	public writeDouble(value: number) {
		this._buffer.methods.writeDouble(this._buffer, value)
	}

	public writeBoolean(value: boolean) {
		this._buffer.methods.writeBoolean(this._buffer, value)
	}

	public writeString(value: Nullable<string>) {
		this._buffer.methods.writeString(this._buffer, value)
	}

	public writeArray(value: Nullable<Array<any>>) {
		this._buffer.methods.writeArray(this._buffer, value)
	}

	public writeObject(value: Nullable<any>) {
		this._buffer.methods.writeObject(this._buffer, value)
	}

	public writeMap(value: Nullable<Map<string | number, any>>) {
		this._buffer.methods.writeMap(this._buffer, value)
	}

	public readByte() {
		return this._buffer.methods.readByte(this._buffer)
	}

	public readShort() {
		return this._buffer.methods.readShort(this._buffer)
	}

	public readInt() {
		return this._buffer.methods.readInt(this._buffer)
	}

	public readLong() {
		return this._buffer.methods.readLong(this._buffer)
	}

	public readFloat() {
		return this._buffer.methods.readFloat(this._buffer)
	}

	public readDouble() {
		return this._buffer.methods.readDouble(this._buffer)
	}

	public readBoolean() {
		return this._buffer.methods.readBoolean(this._buffer)
	}

	public readString() {
		return this._buffer.methods.readString(this._buffer)
	}

	public readArray() {
		return this._buffer.methods.readArray(this._buffer)
	}

	public readObject() {
		return this._buffer.methods.readObject(this._buffer)
	}

	public readMap() {
		return this._buffer.methods.readMap(this._buffer)
	}
}