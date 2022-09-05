const mysql = require('mysql')

// 创建一个连接池
let pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'ping-pong'
})

// 导出查询相关
/* 
    数据库连接池是程序在启动时创建足够多的数据库连接，将这些连接放入一个池子里。
    由程序动态地进行申请，使用和关闭。
    作用：频繁的创建和关闭连接是非常消耗资源的。负责分配，管理和释放数据库连接。允许程序重复使用现有的同一个数据库连接，
         而不是重现创建一个，避免了资源的消耗。
    */
   /* 
        err 表示错误信息。 没有错误的时候是一个空值。
        conn 从连接池中取出的连接对象。可以通过这个对象，去访问数据库。
    */
let query = function(sql,values, cb) {
    pool.getConnection(function(err, conn) {
        if(err) {
            cb(err, null, null)
        } else {
            conn.query(sql,values,function(qerr, vals,fields) {
                // 释放连接
                conn.release()
                // 事件驱动回调
                cb(qerr, vals, fields)
            })
        }
    })
}
module.exports = query