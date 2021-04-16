import BigEndian from "./BigEndian";
import Common from "./Common";
import { ByteOrderedBuffer, Methods, WriteMethods } from "./Methods";

export default class LittleEndian extends Common {

	public static readonly INSTANCE = new LittleEndian()

	private constructor() {
		super()
	}

	public writeShort(buffer: ByteOrderedBuffer, value: number, offset: number) {
		return buffer.writeInt16LE(value, offset) 
	}

	public writeInt(buffer: ByteOrderedBuffer, value: number, offset: number) {
		return buffer.writeInt32LE(value, offset) 
	}

	public writeLong(buffer: ByteOrderedBuffer, value: bigint, offset: number) {
		return buffer.writeBigInt64LE(value, offset) 
	}

	public writeFloat(buffer: ByteOrderedBuffer, value: number, offset: number) {
		return buffer.writeFloatLE(value, offset) 
	}

	public writeDouble(buffer: ByteOrderedBuffer, value: number, offset: number) {
		return buffer.writeDoubleLE(value, offset)
	}

	public invert(): Methods {
		return BigEndian.INSTANCE
	}
}