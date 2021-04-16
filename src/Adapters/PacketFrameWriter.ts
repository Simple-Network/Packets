import { Adapters, EssenClient } from "@simple-network/core"
import { PacketBuffer } from "src/Packets"

export default class PacketFrameWriter extends Adapters.WriteAdapter<PacketBuffer, Buffer> {

	public write(_socket: EssenClient, input: PacketBuffer, out: Buffer[]): Promise<void> {
		const framed = new PacketBuffer()

		framed.writeBytes(input.buffer)
		out.push(framed.buffer)
		return Promise.resolve()
	}
}