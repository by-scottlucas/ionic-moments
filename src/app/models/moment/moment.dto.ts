import { UserDTO } from "../user/user.dto";

export interface MomentDTO {

    id?: number;
    titulo: string;
    data: Date;
    id_usuario: UserDTO;
}