import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name: 'Saif Waleed',
        email: 'saif@email.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name: 'Saad Mohamed',
        email: 'saad@email.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
];
export default users;