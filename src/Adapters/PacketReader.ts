import { Adapters, SNClient } from '@simple-network/core'
import { Packet, PacketBuffer, PacketManager } from 'src/Packets'

export default class PacketReader extends Adapters.ReadAdapter<PacketBuffer, Packet<any>> {

	public read(_socket: SNClient, input: PacketBuffer, out: Packet<any>[]): Promise<void> {
		const packetId = input.readShort()
		const packet = PacketManager.createPacket(packetId)

		if (packet) {
			packet.read(input)
			out.push(packet)

			return Promise.resolve()
		} else
			return Promise.reject(new Error(`Unknown packet id ${packetId}`))
	}
}