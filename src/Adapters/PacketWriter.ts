import { Adapters, EssenClient } from '@simple-network/core'
import { Packet, PacketBuffer, PacketManager } from 'src/Packets'

export default class PacketWriter extends Adapters.WriteAdapter<Packet<any>, PacketBuffer> {

	public write(_socket: EssenClient, input: Packet<any>, out: PacketBuffer[]): Promise<void> {
		const buffer = new PacketBuffer()
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