import BigEndian from './BigEndian'
import Common from './Common'
import { ByteOrderedBuffer, Methods } from './Methods'

export default class LittleEndian extends Common {

	public static readonly INSTANCE = new LittleEndian()

	private constructor() {
		super()
	}

	public writeShort(buffer: ByteOrderedBuffer, value: number) {
		this.ensureWriteCapacity(buffer, 2)
		buffer.writeOffset = buffer.buffer.writeInt16LE(value, buffer.writeOffset)
	}

	public writeInt(buffer: ByteOrderedBuffer, value: number) {
		this.ensureWriteCapacity(buffer, 4)
		buffer.writeOffset = buffer.buffer.writeInt32LE(value, buffer.writeOffset)
	}

	public writeLong(buffer: ByteOrderedBuffer, value: bigint) {
		this.ensureWriteCapacity(buffer, 8)
		buffer.writeOffset = buffer.buffer.writeBigInt64LE(value, buffer.writeOffset)
	}

	public writeFloat(buffer: ByteOrderedBuffer, value: number) {
		this.ensureWriteCapacity(buffer, 4)
		buffer.writeOffset = buffer.buffer.writeFloatLE(value, buffer.writeOffset)
	}

	public writeDouble(buffer: ByteOrderedBuffer, value: number) {
		this.ensureWriteCapacity(buffer, 8)
		buffer.writeOffset = buffer.buffer.writeDoubleLE(value, buffer.writeOffset)
	}

	public readShort(buffer: ByteOrderedBuffer): number {
		this.ensureReadCapacity(buffer, 2)
		let result = buffer.buffer.readInt16LE(buffer.readOffset)
		buffer.readOffset += 2
		return result
	}

	public readInt(buffer: ByteOrderedBuffer): number {
		this.ensureReadCapacity(buffer, 4)
		let result = buffer.buffer.readInt32LE(buffer.readOffset)
		buffer.readOffset += 4
		return result
	}

	public readLong(buffer: ByteOrderedBuffer): bigint {
		this.ensureReadCapacity(buffer, 8)
		let result = buffer.buffer.readBigInt64LE(buffer.readOffset)
		buffer.readOffset += 8
		return result
	}

	public readFloat(buffer: ByteOrderedBuffer): number {
		this.ensureReadCapacity(buffer, 4)
		let result = buffer.buffer.readFloatLE(buffer.readOffset)
		buffer.readOffset += 4
		return result
	}

	public readDouble(buffer: ByteOrderedBuffer): number {
		this.ensureReadCapacity(buffer, 8)
		let result = buffer.buffer.readDoubleLE(buffer.readOffset)
		buffer.readOffset += 8
		return result
	}

	public invert(): Methods {
		return BigEndian.INSTANCE
	}
}