export class CreateUserDto {
    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly status: boolean;
    readonly password: string;
}
