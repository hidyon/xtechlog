/**
 * DBの一般ユーザーを登録
 */

const user = {
  user: 'staff',
  pwd: 'staff_password',
  roles: [{
    role: 'readWrite',
    db: 'test'
  }]
};

db.createUser(user);


/**
 * 初期データ登録
 * db : test
 * collection : articles
 */

db.articles.insertMany(
  [
    {
      title : "サンプル投稿",
      username : "usr01",
      document : "<h3>用途　<p> 対話型要望ボード </p> <p> フォーラム（掲示板） </p> ",
      tags : [ "dev", "nodejs", "mongo", "cobo", "nitube" ],
      views : 0,
      votes : 0,
      countComments : 0,
    },
  ]
)
