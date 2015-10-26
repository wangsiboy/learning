# MongoDB 数据库
Model是对应Schema的编译版本，一个model的实例直接映射为数据库中的一个文档。

## 说明
8种数据类型（String、Number、Date、Boolean和Buffer、ObjectId、Mixed、ObjectId、Mixed、Array）

Buffer是用来存储2进制数据，
ObjectId是不同于_id的特定的识别符。
Mixed可以指定任意类型，不过Mongoose不会自动识别。
Array用来存放基本数据类型，也可以是子文档。
