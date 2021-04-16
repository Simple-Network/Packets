import { IdsToMethods, TypeIds, getType } from './Constants'
import { ByteOrderedBuffer, Methods } from './Methods'

export default abstract class Common implements Methods {

	public write(buffer: ByteOrderedBuffer, value: number, writeType: boolean = false) {
		const methods = buffer.methods
		const typeId = TypeIds[getType(value)]

		if (writeType)
			methods.writeByte(buffer, typeId)
		IdsToMethods[typeId].write(methods)(buffer, value)
	}

	public writeByte(buffer: ByteOrderedBuffer, value: number) {
		this.ensureWriteCapacity(buffer, 1)
		return buffer.buffer.writeInt8(value, buffer.writeOffset)
	}

	public writeBoolean(buffer: ByteOrderedBuffer, value: boolean) {
		this.ensureWriteCapacity(buffer, 1)
		return buffer.buffer.writeInt8(value ? 1 : 0, buffer.writeOffset)
	}
	
	public writeNull(buffer: ByteOrderedBuffer, _value: null) {
		this.ensureWriteCapacity(buffer, 1)
		return buffer.buffer.writeInt8(-1, buffer.writeOffset)
	}
	
	public writeString(buffer: ByteOrderedBuffer, value: string | undefined | null) {
		const data = value ? Buffer.from(value, 'utf-8') : null

		this.writeBytes(buffer, data)
	}

	public writeBytes(buffer: ByteOrderedBuffer, data: Buffer | undefined | null) {
		const methods = buffer.methods

		if (data) {
			methods.writeShort(buffer, data.byteLength)
			data.copy(buffer.buffer, buffer.writeOffset)
			buffer.writeOffset += data.byteLength
		} else methods.writeShort(buffer, -1)
	}

	public writeArray<T>(buffer: ByteOrderedBuffer, value: Array<T> | undefined | null) {
		const methods = buffer.methods

		if (value) {
			this.ensureWriteCapacity(buffer, 2)
			methods.writeShort(buffer, value.length)
			value.forEach(element => methods.write(buffer, element, true))
		} else methods.writeShort(buffer, -1)
	}

	public writeObject(buffer: ByteOrderedBuffer, value: any | undefined | null) {
		const entries = value ? Object.entries(value).filter(([_, entryValue]) => typeof entryValue !== 'function') : null

		return this.writeEntries(buffer, entries)
	}

	public writeMap(buffer: ByteOrderedBuffer, value: Map<string | number, any> | undefined | null) {
		let entries: [string, any][] | null = null

		if (value) {
			entries = []
			value.forEach((value, key) => entries!.push([ key.toString(), value ]))
		}

		return this.writeEntries(buffer, entries)
	}

	public read(buffer: ByteOrderedBuffer): any {
		const methods = buffer.methods
		const typeId = methods.readByte(buffer)

		return IdsToMethods[typeId].read(methods)(buffer)
	}

	public readByte(buffer: ByteOrderedBuffer): number {
		this.ensureReadCapacity(buffer, 1)
		return buffer.buffer.readInt8(buffer.readOffset)
	}

	public readBoolean(buffer: ByteOrderedBuffer): boolean {
		this.ensureReadCapacity(buffer, 1)
		return this.readByte(buffer) === 1
	}

	public readNull(buffer: ByteOrderedBuffer): null {
		this.ensureReadCapacity(buffer, 1)
		if (this.readByte(buffer) == -1) return null
		throw new Error('Not null')
	}

	public readString(buffer: ByteOrderedBuffer): string | null {
		const data = buffer.methods.readBytes(buffer)

		return data ? data.toString('utf-8') : null
	}

	public readBytes(buffer: ByteOrderedBuffer): Buffer | null {
		const methods = buffer.methods
		const length = methods.readShort(buffer)

		if (length < 0) return null
		const data = buffer.buffer.slice(buffer.readOffset, buffer.readOffset + length)
		buffer.readOffset += length
		return data
	}

	public readArray(buffer: ByteOrderedBuffer): Array<any> | null {
		const methods = buffer.methods
		const length = methods.readShort(buffer)

		if (length < 0) return null
		let result = []

		for (let i = 0; i < length; i++) {
			result.push(methods.read(buffer))
		}
		return result
	}

	public readObject(buffer: ByteOrderedBuffer): any | null {
		const entries = this.readEntries(buffer)
		const result: { [key: string]: any } = {}

		if (entries) {
			entries.forEach(([key, value]) => result[key] = value)
			return result
		}
		return null
	}

	public readMap(buffer: ByteOrderedBuffer): Map<string, any> | null {
		let entries = this.readEntries(buffer)

		if (entries)
			return new Map(entries)
		return null
	}

	protected ensureWriteCapacity(buffer: ByteOrderedBuffer, size: number) {
		while (buffer.writeOffset + size >= buffer.buffer.byteLength) {
			buffer.resize()
		}
	}

	protected ensureReadCapacity(buffer: ByteOrderedBuffer, size: number) {
		if (buffer.readOffset + size > buffer.buffer.byteLength)
			throw new Error(`Cannot read ${size} bytes, ${buffer.buffer.byteLength - buffer.readOffset} remaining`)
	}

	private writeEntries(buffer: ByteOrderedBuffer, entries: [string, any][] | null) {
		const methods = buffer.methods

		if (entries) {
			methods.writeShort(buffer, entries.length)
			entries.forEach(([entryKey, entryValue]) => {
				methods.writeString(buffer, entryKey)
				methods.write(buffer, entryValue, true)
			})
		} else methods.writeShort(buffer, -1)
	}

	private readEntries(buffer: ByteOrderedBuffer): [string, any][] | null {
		const methods = buffer.methods
		const length = methods.readShort(buffer)

		if (length < 0) return null
		let result: [string, any][] = []

		for (let i = 0; i < length; i++) {
			let key = methods.readString(buffer)
			let value = methods.read(buffer)

			if (key) result.push([ key, value ])
		}
		return result
	}

	abstract writeShort(buffer: ByteOrderedBuffer, value: number): void
	abstract writeInt(buffer: ByteOrderedBuffer, value: number): void
	abstract writeFloat(buffer: ByteOrderedBuffer, value: number): void
	abstract writeDouble(buffer: ByteOrderedBuffer, value: number): void
	abstract writeLong(buffer: ByteOrderedBuffer, value: bigint): void

	abstract readShort(buffer: ByteOrderedBuffer): number
	abstract readInt(buffer: ByteOrderedBuffer): number
	abstract readFloat(buffer: ByteOrderedBuffer): number
	abstract readDouble(buffer: ByteOrderedBuffer): number
	abstract readLong(buffer: ByteOrderedBuffer): bigint

	abstract invert(): Methods

}