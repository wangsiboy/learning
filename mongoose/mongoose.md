mongoose

1.1 名词解释

Schema ： 一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力

Model ： 由Schema发布生成的模型，具有抽象属性和行为的数据库操作对

Entity ： 由Model创建的实体，他的操作也会影响数据库

var PersonSchema = new mongoose.Schema({
      name:String   
//定义一个属性name，类型为String });
var PersonModel = db.model('Person',PersonSchema);
//如果该Model已经发布，则可以直接通过名字索引到，如下：     //var PersonModel = db.model('Person');var personEntity = new PersonModel({name:'Krouky'}); personEntity.save();
Schema.Types.Mixed
混合类型因为没有特定约束，因此可以任意修改，一旦修改了原型，则必须调用markModified()
    person.anything = {x:[3,4,{y:'change'}]}
    person.markModified('anything');//传入anything，表示该属性类型发生变化
    person.save();

虚拟属性：
PersonSchema.virtual('name.full').get(function(){
      return this.name.first + ' ' + this.name.last;
    });
PersonSchema.virtual('name.full').set(function(name){
      var split = name.split(' ');
      this.name.first = split[0];
      this.name.last = split[1];
    });
配置项有：safe、strict、capped、versionKey、autoIndex
var ExampleSchema = new Schema(config,options);
