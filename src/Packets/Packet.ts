import PacketBuffer from './PacketBuffer'
import PacketListener from './PacketListener'

export default abstract class Packet<HANDLER extends PacketListener> {

	public abstract write(buffer: PacketBuffer): Promise<void>

	public abstract read(buffer: PacketBuffer): Promise<void>

	public abstract handle(hansdler: HANDLER): Promise<void>

}