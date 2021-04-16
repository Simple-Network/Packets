import { Adapters, EssenClient } from "@simple-network/core"
import { NATIVE_ENDIAN } from "src/ByteOrder"
import { Packet, PacketBuffer } from "src/Packets"

export default class PacketFrameReader extends Adapters.ReadAdapter<Buffer, PacketBuffer> {

	public read(_socket: EssenClient, input: Buffer, out: PacketBuffer[]): Promise<void> {
		const methods = NATIVE_ENDIAN
		const frames = new PacketBuffer(input, methods)
		let frame = frames.readBytes()

		while (frame) {
			out.push(new PacketBuffer(frame, methods))

			frame = frames.readBytes()
		}
		return Promise.resolve()
	}
}