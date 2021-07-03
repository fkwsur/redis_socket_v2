module.exports = (sequelize, DataTypes) => {
	const Chatting = sequelize.define(
		'chatting',
		{
			idx : {
				type: DataTypes.INTEGER,
				primaryKey : true,
				autoIncrement : true,
				allowNull : false
			},
			username : {
				type : DataTypes.STRING,
				unique : false,
				allowNull : false
			},
			message : {
				type : DataTypes.STRING,
				allowNull : false
			},
			roomname : {
				type : DataTypes.STRING,
				unique : false,
				allowNull : false
			},
		},
		{
			freezeTableName : true,
			timestamps : false,
			comment : '채팅내역 테이블'
		}
	);
	return Chatting;
}