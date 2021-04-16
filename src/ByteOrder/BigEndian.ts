import Common from "./Common";
import LittleEndian from "./LittleEndian";
import { ByteOrderedBuffer, Methods, WriteMethods } from "./Methods";

export default class BigEndian extends Common {

	public static readonly INSTANCE = new BigEndian()

	private constructor() {
		super()
	}

	public writeShort(buffer: ByteOrderedBuffer, value: number) {
		this.ensureWriteCapacity(buffer, 2)
		buffer.writeOffset = buffer.buffer.writeInt16BE(value, buffer.writeOffset)
	}

	public writeInt(buffer: ByteOrderedBuffer, value: number) {
		this.ensureWriteCapacity(buffer, 4)
		buffer.writeOffset = buffer.buffer.writeInt32BE(value, buffer.writeOffset)
	}

	public writeLong(buffer: ByteOrderedBuffer, value: bigint) {
		this.ensureWriteCapacity(buffer, 8)
		buffer.writeOffset = buffer.buffer.writeBigInt64BE(value, buffer.writeOffset)
	}

	public writeFloat(buffer: ByteOrderedBuffer, value: number) {
		this.ensureWriteCapacity(buffer, 4)
		buffer.writeOffset = buffer.buffer.writeFloatBE(value, buffer.writeOffset)
	}

	public writeDouble(buffer: ByteOrderedBuffer, value: number) {
		this.ensureWriteCapacity(buffer, 8)
		buffer.writeOffset = buffer.buffer.writeDoubleBE(value, buffer.writeOffset)
	}

	public readShort(buffer: ByteOrderedBuffer): number {
		this.ensureReadCapacity(buffer, 2)
		let result = buffer.buffer.readInt16BE(buffer.readOffset)
		buffer.readOffset += 2
		return result
	}

	public readInt(buffer: ByteOrderedBuffer): number {
		this.ensureReadCapacity(buffer, 4)
		let result = buffer.buffer.readInt32BE(buffer.readOffset)
		buffer.readOffset += 4
		return result
	}

	public readLong(buffer: ByteOrderedBuffer): bigint {
		this.ensureReadCapacity(buffer, 8)
		let result = buffer.buffer.readBigInt64BE(buffer.readOffset)
		buffer.readOffset += 8
		return result
	}

	public readFloat(buffer: ByteOrderedBuffer): number {
		this.ensureReadCapacity(buffer, 4)
		let result = buffer.buffer.readFloatBE(buffer.readOffset)
		buffer.readOffset += 4
		return result
	}

	public readDouble(buffer: ByteOrderedBuffer): number {
		this.ensureReadCapacity(buffer, 8)
		let result = buffer.buffer.readDoubleBE(buffer.readOffset)
		buffer.readOffset += 8
		return result
	}

	public invert(): Methods {
		return LittleEndian.INSTANCE
	}
}