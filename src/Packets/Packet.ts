import PacketBuffer from "./PacketBuffer";
import PacketHandler from "./PacketHandler";

export default abstract class Packet<HANDLER extends PacketHandler> {

	public abstract write(buffer: PacketBuffer): Promise<void>

	public abstract read(buffer: PacketBuffer): Promise<void>

	public abstract handle(hansdler: HANDLER): Promise<void>

}