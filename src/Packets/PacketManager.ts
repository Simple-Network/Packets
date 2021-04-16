import Packet from "./Packet"

type PacketConstructor = new () => Packet<any>

class PacketManager {

	public static readonly INSTANCE = new PacketManager()

	private packets: Array<PacketConstructor> = new Array()

	public register(packet: PacketConstructor) {
		this.packets.push(packet)		
	}

	public unregister(packet: PacketConstructor) {
		this.packets = this.packets.filter(packetConstructor => packetConstructor !== packet)
	}

	public getPacketId(packet: PacketConstructor | Packet<any>) {
		const constructor: PacketConstructor = packet instanceof Packet ? Object.getPrototypeOf(packet) : packet

		return this.packets.indexOf(constructor)
	}

	public createPacket(packetId: number) {
		const constructor = this.packets[packetId]

		return constructor ? new constructor() : null
	}
}

export default PacketManager.INSTANCE