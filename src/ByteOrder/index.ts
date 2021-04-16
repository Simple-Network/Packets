import { Methods, WriteMethod, WriteMethods, ByteOrderedBuffer, Nullable } from './Methods'
import * as Constants from './Constants'
import BigEndian from './BigEndian'
import LittleEndian from './LittleEndian'

const native = () => {
	let uInt32 = new Uint32Array([0x11223344])
    let uInt8 = new Uint8Array(uInt32.buffer)

	if (uInt8[0] === 0x44) return LittleEndian.INSTANCE
	else if (uInt8[0] === 0x11) return BigEndian.INSTANCE
	throw new Error('WTF not BigEndian and not LittleEndian')
}

const NATIVE_ENDIAN = native()

export {
	Methods,
	WriteMethod,
	WriteMethods,
	ByteOrderedBuffer,
	Nullable,

	Constants,
	native,
	NATIVE_ENDIAN
}