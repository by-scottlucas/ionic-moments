import { UserDTO } from "../user/user.dto";

export interface MomentDTO {

    id?: number;
    titulo: string;
    data: string;
    id_usuario: UserDTO;
}