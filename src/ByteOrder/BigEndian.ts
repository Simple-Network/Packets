import Common from "./Common";
import LowerEndian from "./LittleEndian";
import { ByteOrderedBuffer, Methods, WriteMethods } from "./Methods";

export default class BigEndian extends Common {

	public static readonly INSTANCE = new BigEndian()

	private constructor() {
		super()
	}

	public writeShort(buffer: ByteOrderedBuffer, value: number, offset: number) {
		return buffer.writeInt16BE(value, offset) 
	}

	public writeInt(buffer: ByteOrderedBuffer, value: number, offset: number) {
		return buffer.writeInt32BE(value, offset) 
	}

	public writeLong(buffer: ByteOrderedBuffer, value: bigint, offset: number) {
		return buffer.writeBigInt64BE(value, offset) 
	}

	public writeFloat(buffer: ByteOrderedBuffer, value: number, offset: number) {
		return buffer.writeFloatBE(value, offset) 
	}

	public writeDouble(buffer: ByteOrderedBuffer, value: number, offset: number) {
		return buffer.writeDoubleBE(value, offset)
	}

	public invert(): Methods {
		return LowerEndian.INSTANCE
	}
}