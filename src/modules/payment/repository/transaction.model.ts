import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "transactions",
    timestamps: false,
})
export default class TransactionModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare public id: string;

    @Column({ allowNull: false, field: "order_id" })
    declare public orderId: string;

    @Column({ allowNull: false })
    declare public amount: number;

    @Column({ allowNull: false })
    declare public status: string;

    @Column({ allowNull: false, field: "created_at" })
    declare public createdAt: Date;

    @Column({ allowNull: false, field: "updated_at" })
    declare public updatedAt: Date;
}