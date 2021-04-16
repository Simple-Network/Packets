import { IdsToMethods, TypeIds, getType } from "./Constants";
import { ByteOrderedBuffer, Methods, WriteMethod, WriteMethods } from "./Methods";

export default abstract class Common implements Methods {

	write(buffer: ByteOrderedBuffer, value: number, offset: number, writeType: boolean = false) {
		const methods = buffer.methods
		const typeId = TypeIds[getType(value)]

		if (writeType)
			offset = methods.writeByte(buffer, typeId, offset)
		offset = IdsToMethods[typeId].write(methods)(buffer, value, offset)
		return offset
	}

	writeByte(buffer: ByteOrderedBuffer, value: number, offset: number) {
		return buffer.writeInt8(value, offset)
	}

	writeBoolean(buffer: ByteOrderedBuffer, value: boolean, offset: number) {
		return buffer.writeInt8(value ? 1 : 0, offset)
	}
	
	writeNull(buffer: ByteOrderedBuffer, _value: null, offset: number) {
		return buffer.writeInt8(-1, offset)
	}
	
	writeString(buffer: ByteOrderedBuffer, value: string, offset: number) {
		const methods = buffer.methods
		const data = Buffer.from(value, 'utf-8')

		offset = methods.writeShort(buffer, data.byteLength, offset)
		buffer.fill(data, offset)
		return offset + data.byteLength
	}

	writeArray<T>(buffer: ByteOrderedBuffer, value: Array<T>, offset: number) {
		const methods = buffer.methods

		offset = methods.writeShort(buffer, value.length, offset)
		value.forEach(element => {
			offset = methods.write(buffer, element, offset, true)
		})
		return offset
	}

	writeObject(buffer: ByteOrderedBuffer, value: any | Map<string | number, any>, offset: number) {
		const methods = buffer.methods
		const entries = Object.entries(value).filter(([_, entryValue]) => typeof entryValue !== 'function')

		offset = methods.writeShort(buffer, entries.length, offset)
		entries.forEach(([entryKey, entryvalue]) => {
			offset = methods.writeString(buffer, entryKey, offset)
			offset = methods.write(buffer, entryvalue, offset, true)
		})
		return offset
	}

	abstract writeShort(buffer: ByteOrderedBuffer, value: number, offset: number): number
	abstract writeInt(buffer: ByteOrderedBuffer, value: number, offset: number): number
	abstract writeFloat(buffer: ByteOrderedBuffer, value: number, offset: number): number
	abstract writeDouble(buffer: ByteOrderedBuffer, value: number, offset: number): number
	abstract writeLong(buffer: ByteOrderedBuffer, value: bigint, offset: number): number
	abstract invert(): Methods

}