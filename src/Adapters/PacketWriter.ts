import { Adapters, SNClient } from '@simple-network/core'
import { NATIVE_ENDIAN, Methods } from 'src/ByteOrder'
import { Packet, PacketBuffer, PacketManager } from 'src/Packets'

export default class PacketWriter extends Adapters.WriteAdapter<Packet<any>, PacketBuffer> {

	constructor(private methods: Methods = NATIVE_ENDIAN) {
		super()
	}

	public write(_socket: SNClient, input: Packet<any>, out: PacketBuffer[]): Promise<void> {
		const buffer = new PacketBuffer(this.methods)
		const packetId = PacketManager.getPacketId(input)

		if (packetId) {
			buffer.writeShort(packetId)
			input.write(buffer)
			out.push(buffer)

			return Promise.resolve()
		} else
			return Promise.reject(new Error(`Unknown packet ${input}`))
	}
}