import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class addTokens1708797887896 implements MigrationInterface {

    // This migration would be needed if you decide to store your Access Tokens in a DB table. 
    // tokens - has one user
    // user - has many tokens
    // each token should be unique to the user
    // add a 'deleted_at' field if you'd like soft deletes.. 
    // This might add complexity if a deleted token from user1 matches a token from user2. 

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query('CREATE TABLE Tokens (user_id int, token varchar(255));')
        // await queryRunner.createTable(
        //     new Table({
        //         name: 'tokens',
        //         columns: [
        //             {
        //                 name: 'user_id',
        //                 type: 'varchar',
        //                 isPrimary: true
        //             },
        //             {
        //                 name: 'token',
        //                 type: 'varchar'
        //             },
        //             {
        //                 name: '',
        //                 type: 'boolean'
        //             }
        //         ]
        //     })
        // )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query('DROP TABLE Tokens;')

    }

}
