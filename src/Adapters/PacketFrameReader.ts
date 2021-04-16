import { Adapters, SNClient } from '@simple-network/core'
import { NATIVE_ENDIAN, Methods } from 'src/ByteOrder'
import { PacketBuffer } from 'src/Packets'

export default class PacketFrameReader extends Adapters.ReadAdapter<Buffer, PacketBuffer> {

	constructor(private methods: Methods = NATIVE_ENDIAN) {
		super()
	}

	public read(_socket: SNClient, input: Buffer, out: PacketBuffer[]): Promise<void> {
		const frames = new PacketBuffer(input, this.methods)
		let frame = frames.readBytes()

		while (frame) {
			out.push(new PacketBuffer(frame, this.methods))

			frame = frames.readBytes()
		}
		return Promise.resolve()
	}
}