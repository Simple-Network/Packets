import { Adapters, SNClient } from '@simple-network/core'
import { NATIVE_ENDIAN, Methods } from 'src/ByteOrder'
import { PacketBuffer } from 'src/Packets'

export default class PacketFrameWriter extends Adapters.WriteAdapter<PacketBuffer, Buffer> {

	constructor(private methods: Methods = NATIVE_ENDIAN) {
		super()
	}

	public write(_socket: SNClient, input: PacketBuffer, out: Buffer[]): Promise<void> {
		const framed = new PacketBuffer(this.methods)

		framed.writeBytes(input.buffer)
		out.push(framed.buffer)
		return Promise.resolve()
	}
}