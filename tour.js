(function () {
  'use strict';
  
  var STORE_KEY = 'nn_world_tour_main'; 
  var selectedTd = null;
  var doneSet = {};
  var COUNTRY_TABS = ['苹果', '云端', '莉莉斯', '信鸽', '北地', '荒原'];

  try {
    var oldKeys = ['nn_world_tour_v27', 'nn_world_tour_v26', 'nn_world_tour_v25', 'nn_world_tour_v24', 'nn_world_tour_v23', 'nn_world_tour_v22'];
    var foundOldData = null;
    if (!localStorage.getItem(STORE_KEY)) {
      for (var i = 0; i < oldKeys.length; i++) {
        var data = localStorage.getItem(oldKeys[i]);
        if (data) { foundOldData = data; break; }
      }
      if (foundOldData) localStorage.setItem(STORE_KEY, foundOldData);
    }
  } catch (e) {}

  try {
    var raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      var p = JSON.parse(raw);
      if (p && typeof p === 'object') doneSet = p;
    }
  } catch(e){}

  var RAW_DATA = [
    { c:'苹果', ct:'卢索', s:'第六医疗所', e:'特工任务1', st:'黑框眼镜', t:'夜', w:'雨' },
    { c:'', ct:'', s:'', e:'恶魔医生的回忆', st:'', t:'', w:'' },
    { c:'', ct:'', s:'第八区', e:'特工任务2', st:'', t:'', w:'' },
    { c:'', ct:'', s:'', e:'误入第八区', st:'', t:'', w:'' },
    { c:'', ct:'', s:'秘影巷', e:'秘巷危情', st:'质感漆桶', t:'', w:'' },
    { c:'', ct:'', s:'挥金乐园', e:'特工任务3', st:'', t:'夜', w:'' },
    { c:'', ct:'', s:'', e:'逝去的乐园', st:'', t:'', w:'' },
    { c:'', ct:'威尔顿', s:'苏比露天影院', e:'光影之忆', st:'光影瞬间', t:'昼 暮 夜', w:'' },
    { c:'', ct:'', s:'城市广场', e:'索菲亚的演出2', st:'', t:'', w:'' },
    { c:'', ct:'', s:'', e:'设计前沿峰会', st:'', t:'', w:'' },
    { c:'', ct:'', s:'荷赛艺术街区', e:'美食之旅4', st:'', t:'', w:'' },
    { c:'', ct:'', s:'', e:'街区艺术', st:'', t:'', w:'' },
    { c:'', ct:'', s:'联邦服装集团', e:'恋人的幸福3', st:'', t:'', w:'' },
    { c:'', ct:'', s:'', e:'新品发布会', st:'', t:'', w:'' },
    { c:'', ct:'', s:'海克斯水族馆', e:'特色推荐', st:'无忧小鱼', t:'', w:'' },
    { c:'', ct:'', s:'真是果茶店', e:'奇妙搭配', st:'醇香奶茶', t:'昼 暮 夜', w:'' },
    { c:'', ct:'罗塞城', s:'罗塞车站', e:'星引之行', st:'车票存根', t:'', w:'' },
    { c:'', ct:'', s:'缇克纪念品商店', e:'最佳折扣', st:'精致提包', t:'', w:'' },
    { c:'', ct:'', s:'诺塔赫酒店', e:'记者素养', st:'优雅侍者', t:'', w:'' },
    { c:'', ct:'麦川', s:'麦野', e:'麦田写生', st:'', t:'', w:'' },
    { c:'', ct:'', s:'', e:'', st:'', t:'', w:'' },
    { c:'', ct:'', s:'', e:'美食之旅1', st:'五花肉', t:'', w:'' },
    { c:'', ct:'', s:'麦口酒吧', e:'温暖回忆的歌', st:'', t:'', w:'' },
    { c:'', ct:'', s:'', e:'', st:'', t:'', w:'' },
    { c:'', ct:'', s:'', e:'小寻与怪盗1', st:'铅笔贴纸', t:'', w:'' },
    { c:'', ct:'', s:'清心坊', e:'物是人非', st:'', t:'', w:'' },
    { c:'', ct:'', s:'', e:'', st:'', t:'', w:'' },
    { c:'', ct:'', s:'', e:'恋人的幸福2', st:'', t:'', w:'' },
    { c:'', ct:'', s:'稻草人喷泉', e:'美食之旅2', st:'', t:'', w:'' },
    { c:'', ct:'', s:'', e:'街头乐队', st:'稻草人雕塑', t:'', w:'' },
    { c:'', ct:'圣西城', s:'布里克街', e:'时装风潮', st:'交易走势', t:'夜', w:'' },
    { c:'', ct:'', s:'时代之塔', e:'落日美景', st:'摩天大楼', t:'夜', w:'' },
    { c:'', ct:'', s:'菲利普实验室', e:'趣味实验', st:'实验时刻', t:'昼 夜', w:'' },
    { c:'', ct:'', s:'天空之翼', e:'天使投资', st:'天使之翼', t:'夜', w:'' },
    { c:'', ct:'鲁尔特丹', s:'派阿罗歌剧院', e:'小寻与怪盗3', st:'', t:'', w:'' },
    { c:'', ct:'', s:'', e:'索菲亚的演出3', st:'', t:'', w:'' },
    { c:'', ct:'', s:'', e:'古典公主', st:'', t:'', w:'' },
    { c:'', ct:'', s:'鲁尔特丹博物馆', e:'小寻与怪盗2', st:'', t:'', w:'' },
    { c:'', ct:'', s:'', e:'特别的礼物', st:'', t:'', w:'' },
    { c:'', ct:'', s:'九日暮', e:'寻宝游戏1', st:'银杏叶', t:'', w:'' },
    { c:'', ct:'', s:'', e:'自信的搭配师', st:'', t:'', w:'' },
    { c:'', ct:'', s:'辛吉娅画室', e:'画意深谈', st:'缤纷画架', t:'昼 暮 夜', w:'' },
    { c:'', ct:'', s:'卡洛西音乐厅', e:'甜蜜交响乐', st:'', t:'暮 夜', w:'' },
    { c:'', ct:'坎密亚', s:'耶利旅舍', e:'喵在囧途', st:'', t:'昼 暮 夜', w:'' },
    { c:'', ct:'', s:'瑞亚野营地', e:'自然写生', st:'', t:'昼 暮', w:'' },
    { c:'', ct:'', s:'冒险家农场', e:'农场欢游', st:'', t:'昼 暮 夜', w:'' },
    
    { c:'云端', ct:'洛川城', s:'洛云峰怪石', e:'洛云晨光', st:'', t:'', w:'' },
    { c:'', ct:'', s:'', e:'寻宝游戏4', st:'', t:'', w:'' },
    { c:'', ct:'', s:'赤目塔', e:'寻宝游戏2', st:'', t:'', w:'' },
    { c:'', ct:'', s:'', e:'赤目传说', st:'', t:'', w:'' },
    { c:'', ct:'', s:'飞雪桥', e:'飞雪见故人', st:'', t:'', w:'雪' },
    { c:'', ct:'', s:'', e:'恋人的幸福1', st:'玫瑰贴纸', t:'', w:'' },
    { c:'', ct:'水莲乡', s:'茉莉舞厅', e:'万种风情', st:'经典旋律', t:'', w:'' },
    { c:'', ct:'', s:'鸢宁街', e:'热闹街头', st:'缤纷霓虹', t:'', w:'雪' },
    { c:'', ct:'', s:'恒心电影院', e:'传奇故事', st:'放映时光', t:'夜', w:'' },
    { c:'', ct:'宁州城', s:'弦音溪', e:'溪音鸣玉', st:'蕴竹清流', t:'昼 暮 夜', w:'' },
    { c:'', ct:'', s:'香培茶室', e:'品茗逸事', st:'留香雅盏', t:'昼 暮 夜', w:'' },
    { c:'', ct:'', s:'蕴芳园', e:'循芳引途', st:'芬芳悄驻', t:'昼 暮 夜', w:'' },
    { c:'', ct:'月下城', s:'绫家绢坊', e:'索菲亚的演出1', st:'麦克风', t:'', w:'雨' },
    { c:'', ct:'', s:'', e:'迷花锦缎轻如雾', st:'', t:'', w:'' },
    { c:'', ct:'', s:'月下游乐场', e:'美食之旅3', st:'', t:'', w:'' },
    { c:'', ct:'', s:'', e:'游园偶遇', st:'', t:'', w:'' },
    { c:'', ct:'', s:'对影亭', e:'寻宝游戏3', st:'', t:'', w:'' },
    { c:'', ct:'', s:'', e:'双月对影', st:'', t:'', w:'' },
    { c:'', ct:'云端长街', s:'醉月楼', e:'醉月盛宴', st:'美味佳肴', t:'', w:'' },
    { c:'', ct:'', s:'枫林园', e:'红叶与琴声', st:'金秋丹枫', t:'夜', w:'' },
    { c:'', ct:'', s:'长街绢坊', e:'染布大师', st:'迷花染布', t:'夜', w:'' },
    { c:'', ct:'云京', s:'情笺碑', e:'氤氲情思', st:'镌情碑石', t:'', w:'' },
    { c:'', ct:'', s:'云京大学堂', e:'设计师讲座', st:'学堂课本', t:'暮 夜', w:'' },
    { c:'', ct:'', s:'鲸波书斋', e:'斋中数卷', st:'斋中书简', t:'', w:'' },
    { c:'', ct:'', s:'太清湖', e:'苇叶扁舟', st:'太清湖', t:'暮 夜', w:'雪' },
    { c:'', ct:'', s:'云京皇宫', e:'宫中夜话', st:'脊兽飞檐', t:'夜', w:'雪' },
    { c:'', ct:'', s:'太明寺', e:'斋居守素', st:'无忧花', t:'夜', w:'' },
    { c:'', ct:'', s:'太极观', e:'问道我心', st:'阴阳两极', t:'', w:'' },
    { c:'', ct:'', s:'平仲园', e:'树树金黄', st:'平仲银杏', t:'', w:'' },
    { c:'', ct:'云锦城', s:'苍河湾', e:'白家小妹2', st:'', t:'', w:'' },
    { c:'', ct:'', s:'', e:'苍河泛舟行', st:'', t:'', w:'' },
    { c:'', ct:'', s:'灵囿', e:'雀羽传福2', st:'', t:'', w:'' },
    { c:'', ct:'', s:'', e:'白家小妹3', st:'', t:'', w:'' },
    { c:'', ct:'', s:'', e:'灵囿奇遇', st:'', t:'', w:'' },
    { c:'', ct:'', s:'晋林宫', e:'雀羽传福1', st:'', t:'', w:'雨' },
    { c:'', ct:'', s:'', e:'雀羽传福3', st:'', t:'', w:'' },
    { c:'', ct:'', s:'', e:'白家小妹1', st:'兔兔', t:'', w:'' },
    { c:'', ct:'', s:'', e:'晋林天仪', st:'', t:'', w:'' },

    { c:'莉莉斯', ct:'西西亚', s:'西西亚设计学院', e:'群星的指引', st:'魅力口红', t:'', w:'' },
    { c:'', ct:'', s:'西西亚车站', e:'梦幻时刻', st:'西西亚火车票', t:'', w:'' },
    { c:'', ct:'', s:'凯特莱气球中心', e:'诺亚的完美魔法', st:'浪漫热气球', t:'夜', w:'' },
    { c:'', ct:'', s:'西西亚大剧院', e:'闪耀明星大喵', st:'', t:'', w:'' },
    { c:'', ct:'', s:'', e:'星盘的指引3', st:'', t:'', w:'' },
    { c:'', ct:'', s:'赫鲁兹书店', e:'随性的店主', st:'智慧之书', t:'', w:'' },
    { c:'', ct:'格尔维拉', s:'芙罗拉花市', e:'花之心语', st:'馨香一隅', t:'暮 夜', w:'' },
    { c:'', ct:'', s:'麦麦格旧院', e:'艺术向导', st:'旧忆小椅', t:'暮 夜', w:'' },
    { c:'', ct:'', s:'吉蒂马车', e:'马车之景', st:'旅途伙伴', t:'夜', w:'' },
    { c:'', ct:'海登', s:'奥塔乐园', e:'大喵的杰作', st:'过山车', t:'夜', w:'' },
    { c:'', ct:'', s:'日月之塔', e:'再遇莉莉安', st:'永夜国', t:'', w:'' },
    { c:'', ct:'', s:'糖果小镇', e:'童话奇遇', st:'美味棒棒糖', t:'夜', w:'' },
    { c:'', ct:'', s:'幻想之巅', e:'街头采访', st:'莉莉安', t:'夜', w:'雨' },
    { c:'', ct:'王城', s:'王城城堡', e:'奇怪的史丢丢', st:'', t:'夜', w:'' },
    { c:'', ct:'', s:'', e:'星盘的指引1', st:'粉色小猪', t:'', w:'' },
    { c:'', ct:'', s:'梦幻殿堂', e:'熟悉的雕像', st:'', t:'', w:'' },
    { c:'', ct:'', s:'', e:'星盘的指引2', st:'', t:'', w:'' },
    { c:'', ct:'', s:'蒂安安花坊', e:'突如其来的灵感', st:'花香门牌', t:'夜', w:'' },
    { c:'', ct:'', s:'松鼠咖啡厅', e:'梦幻搭配蛋糕', st:'', t:'', w:'' },
    { c:'', ct:'赫拉维', s:'星梦礼堂', e:'传递幸福之花', st:'幸福捧花', t:'', w:'' },
    { c:'', ct:'', s:'落日餐厅', e:'演唱嘉宾', st:'微光烛台', t:'夜', w:'' },
    { c:'', ct:'', s:'恋人岩', e:'最美的烟火', st:'浪漫秋千', t:'夜', w:'' },
    { c:'', ct:'', s:'恋心邮局', e:'情意慢递', st:'慕心邮筒', t:'昼 暮 夜', w:'' },
    { c:'', ct:'', s:'伦特庄园', e:'浪漫花海', st:'芳香郁金', t:'昼 暮 夜', w:'' },
    { c:'', ct:'温特蒙', s:'米米特海湾', e:'海洋史丢丢', st:'', t:'', w:'雨' },
    { c:'', ct:'', s:'克里托度假村', e:'立风的歌', st:'', t:'暮', w:'雨' },
    { c:'', ct:'', s:'翡翡希洞窟', e:'薰风逐波', st:'馥郁满舟', t:'暮 夜', w:'' },
    { c:'', ct:'', s:'山坡广场', e:'五花肉设计', st:'', t:'夜', w:'雨' },

    { c:'信鸽', ct:'迪尔诺德', s:'皮修斯玩具屋', e:'茸茸心事', st:'小熊', t:'暮 夜', w:'' },
    { c:'', ct:'', s:'洛林德调香室', e:'妙手生香', st:'香水', t:'', w:'' },
    { c:'', ct:'', s:'米索庄园', e:'遥望远梦', st:'金丝眼镜', t:'暮 夜', w:'' },
    { c:'', ct:'依米兰', s:'联合图书馆', e:'山中书馆', st:'智慧之鸟', t:'昼 暮 夜', w:'' },
    { c:'', ct:'', s:'亚洛斯观景台', e:'远眺风景', st:'遥望远方', t:'昼 暮 夜', w:'' },
    { c:'', ct:'', s:'帕拉斯桥', e:'赐慧之桥', st:'赐慧之水', t:'暮 夜', w:'' },
    { c:'', ct:'', s:'新叶咖啡馆', e:'提神咖啡', st:'香醇咖啡', t:'', w:'' },
    { c:'', ct:'信鸽森林', s:'竖琴瀑布', e:'瀑布边的王子', st:'浪漫竖琴', t:'夜', w:'' },
    { c:'', ct:'', s:'石碑林', e:'巧遇拂苏', st:'神秘水晶', t:'', w:'' },
    { c:'', ct:'', s:'蘑菇栖所', e:'黛奥比的家', st:'蘑菇屋', t:'夜', w:'' },
    { c:'', ct:'海蒂小镇', s:'弗纳庄园', e:'牧场趣事', st:'可爱哞哞', t:'暮 夜', w:'' },
    { c:'', ct:'', s:'馥馨花庭', e:'花间灵感', st:'飘香午茶', t:'昼 暮 夜', w:'' },
    { c:'', ct:'', s:'克雷尔小屋', e:'醇香满屋', st:'赏味汤勺', t:'暮 夜', w:'' },
    { c:'', ct:'奥伦城', s:'罗莎莱艺术餐厅', e:'玫瑰奇遇', st:'弥香瓷碟', t:'', w:'' },
    { c:'', ct:'', s:'奥伦城市政厅', e:'误入餐厅', st:'荣耀盔甲', t:'', w:'' },
    { c:'', ct:'', s:'伦纳河', e:'夕阳河上', st:'河心小船', t:'暮 夜', w:'' },
    { c:'', ct:'', s:'蔷薇花园', e:'艾思的茶会', st:'蔷薇满园', t:'夜', w:'' },
    { c:'', ct:'', s:'普林提故居', e:'解说员奥兰多', st:'见字如面', t:'', w:'' },
    { c:'', ct:'', s:'伊希莉美术馆', e:'别样观览', st:'鎏金画框', t:'', w:'' },
    { c:'', ct:'南斯洛城', s:'希达亚电车餐厅', e:'美味特访', st:'列车模型', t:'昼 暮 夜', w:'' },
    { c:'', ct:'', s:'南斯洛飞艇站', e:'匆忙的黑卡', st:'飞空艇', t:'夜', w:'' },
    { c:'', ct:'', s:'记忆之芯', e:'疯狂购物', st:'记忆之芯', t:'', w:'' },
    { c:'', ct:'', s:'奥维尔艺术工厂', e:'机构与少女', st:'管道时钟', t:'', w:'雨' },
    { c:'', ct:'', s:'菲莉丝植物园', e:'午后绿荫', st:'清新绿意', t:'昼 暮 夜', w:'' },
    { c:'', ct:'伊普利多港', s:'伊普利码头', e:'南希的休闲时光', st:'豪华游轮', t:'夜', w:'' },
    { c:'', ct:'', s:'皇家灯塔', e:'灯塔鬼影', st:'皇家灯塔', t:'夜', w:'' },
    { c:'', ct:'', s:'蓝海公路', e:'海风拂面', st:'游嬉海鸥', t:'昼 暮 夜', w:'' },
    { c:'', ct:'', s:'白银旋转餐厅', e:'伊莎的秘密', st:'日银烤肉', t:'', w:'' },

    { c:'北地', ct:'黑水城', s:'军事博物馆', e:'崇武之国', st:'乘风破浪', t:'', w:'' },
    { c:'', ct:'', s:'厄尔利亚滑雪场', e:'客串教练', st:'梦幻缆车', t:'夜', w:'' },
    { c:'', ct:'', s:'爱德维亚剧场', e:'魔法时间', st:'缤纷剧场', t:'', w:'' },
    { c:'', ct:'', s:'西莫雪地温泉', e:'暖意融融', st:'冰山摆件', t:'夜', w:'' },
    { c:'', ct:'', s:'玻昂冰淇淋工厂', e:'沁凉之法', st:'沁甜霜球', t:'夜', w:'' },
    { c:'', ct:'白石城', s:'自由之塔', e:'高塔的倒影', st:'自由之塔', t:'夜', w:'' },
    { c:'', ct:'', s:'尤妮金娜广场', e:'自由庆典', st:'冰风战歌', t:'暮', w:'' },
    { c:'', ct:'', s:'安塔斯马场', e:'驰骋的马儿', st:'千里良驹', t:'夜', w:'' },
    { c:'', ct:'', s:'时光钟表店', e:'钟表馆的影子', st:'鎏金怀表', t:'夜', w:'' },
    { c:'', ct:'哈罗德', s:'艾汀陶艺坊', e:'陶艺初体验', st:'手作陶瓷', t:'夜', w:'' },
    { c:'', ct:'', s:'天空之镜', e:'星星的礼物', st:'雪原小屋', t:'暮 夜', w:'' },
    { c:'', ct:'', s:'博格峡谷', e:'峭壁上的芭蕾', st:'澄明净水', t:'昼 暮 夜', w:'' },
    { c:'', ct:'墨尔多萨', s:'火炬广场', e:'庆典摊位', st:'', t:'暮 夜', w:'' },
    { c:'', ct:'', s:'冰舟餐厅', e:'美食推荐', st:'', t:'暮 夜', w:'' },
    { c:'', ct:'', s:'伊琳娜冰雕馆', e:'冰雕特展', st:'', t:'', w:'' },
    { c:'', ct:'', s:'金银号船坞', e:'一往无前', st:'金银号', t:'暮 夜', w:'' },

    { c:'荒原', ct:'塞斯山', s:'乌善金石工坊', e:'宝石灵光', st:'璀璨钻链', t:'', w:'' },
    { c:'', ct:'', s:'乌善河', e:'哨望之途', st:'晶莹星矿', t:'昼 暮 夜', w:'' },
    { c:'', ct:'', s:'留风角', e:'留风怀思', st:'生机青苗', t:'昼 暮 夜', w:'' },
    { c:'', ct:'乌都大漠', s:'海市蜃楼', e:'虚幻美景', st:'异域建筑', t:'', w:'' },
    { c:'', ct:'', s:'月季谷', e:'戈壁写生', st:'荒漠月季', t:'', w:'' },
    { c:'', ct:'', s:'雪鲸洲', e:'鲸州鬼火', st:'远古遗骸', t:'夜', w:'' },
    { c:'', ct:'菠挞', s:'菠挞部落', e:'沙漠之舟', st:'沙漠之舟', t:'夜', w:'' },
    { c:'', ct:'', s:'', e:'璨金山丘', st:'', t:'夜', w:'' },
    { c:'', ct:'', s:'呦挞集市', e:'蓝鸟奇缘', st:'缤纷水果', t:'夜', w:'' },
    { c:'', ct:'', s:'古丽法后院', e:'布料展览', st:'轻柔织布', t:'昼 暮 夜', w:'' },
    { c:'', ct:'', s:'帐篷餐厅', e:'异域舞娘', st:'烤肉大餐', t:'', w:'' },
    { c:'', ct:'风之渊', s:'崖可牧场', e:'繁星的指引', st:'雪日牦牛', t:'夜', w:'' },
    { c:'', ct:'', s:'圣焰峰', e:'会当凌绝顶', st:'圣焰峰', t:'', w:'' },
    { c:'', ct:'', s:'娜奇景观长廊', e:'自然的呼唤', st:'优雅杯盏', t:'暮', w:'' },
    { c:'', ct:'', s:'风息驿站', e:'游历四海', st:'斑斓彩灯', t:'夜', w:'' }
  ];

  for(var i = 0; i < RAW_DATA.length; i++) {
    if (RAW_DATA[i].s太极 !== undefined) delete RAW_DATA[i].s太极;
  }

  var tbody = document.getElementById('tourBody');
  var tabsEl = document.querySelector('.tabs');
  var progressEl = document.getElementById('progressText');
  var btnDone = document.getElementById('btnDone');
  var btnUndone = document.getElementById('btnUndone');
  var btnReset = document.getElementById('btnReset');
  var btnSave = document.getElementById('btnSave');
  var btnCode = document.getElementById('btnCode'); // 新增
  var tableCard = document.getElementById('tableCard');
  
  var imgOverlay = document.getElementById('imgOverlay');
  var imgPreview = document.getElementById('imgPreview');
  var imgClose = document.getElementById('imgClose');

  var codeOverlay = document.getElementById('codeOverlay');
  var saveCodeInput = document.getElementById('saveCodeInput');
  var btnCopyCode = document.getElementById('btnCopyCode');
  var btnPasteCode = document.getElementById('btnPasteCode');
  var btnCloseCode = document.getElementById('btnCloseCode');

  var allMarkable = []; 
  var currentCountry = COUNTRY_TABS[0];
  var touchStartX = 0, touchStartY = 0;
  var parsedCountries = []; 

  function buildFlexTable() {
    parsedCountries = [];
    var currentCountryObj = null;
    var currentCityObj = null;
    var currentSpotObj = null;
    var lastCountry = null;

    for (var i = 0; i < RAW_DATA.length; i++) {
      var r = RAW_DATA[i];
      if (r.c) {
        lastCountry = r.c;
        currentCountryObj = { name: r.c, cities: [] };
        parsedCountries.push(currentCountryObj);
        currentCityObj = null;
      }
      
      if (r.ct) {
        if (!currentCountryObj) {
          currentCountryObj = { name: lastCountry, cities: [] };
          parsedCountries.push(currentCountryObj);
        }
        currentCityObj = { name: r.ct, spots: [] };
        currentCountryObj.cities.push(currentCityObj);
        currentSpotObj = null;
      }

      if (r.s) {
        if (!currentCityObj) {
          currentCityObj = { name: '', spots: [] };
          currentCountryObj.cities.push(currentCityObj);
        }
        currentSpotObj = { name: r.s, events: [] };
        currentCityObj.spots.push(currentSpotObj);
      }

      if (r.e || r.st || r.t || r.w) {
        if (!currentSpotObj) {
          if (!currentCityObj) {
             currentCityObj = { name: '', spots: [] };
             currentCountryObj.cities.push(currentCityObj);
          }
          currentSpotObj = { name: '', events: [] };
          currentCityObj.spots.push(currentSpotObj);
        }
        currentSpotObj.events.push({ rowIdx: i, e: r.e, st: r.st, t: r.t, w: r.w });
      }
    }

    var html = '';
    for (var c = 0; c < parsedCountries.length; c++) {
      var cty = parsedCountries[c];
      var isCurrent = (cty.name === currentCountry);
      var trStyle = isCurrent ? '' : 'style="display:none;"';

      for (var ci = 0; ci < cty.cities.length; ci++) {
        var city = cty.cities[ci];
        
        html += '<div class="tr-row" data-country="' + cty.name + '" ' + trStyle + '>';

        html += '<div class="td w-city markable" data-key="city_'+c+'_'+ci+'">' + (city.name || '') + '</div>';

        html += '<div class="col-group w-spot">';
        for (var s = 0; s < city.spots.length; s++) {
          var spot = city.spots[s];
          var sEvents = spot.events.length;
          if (sEvents === 0) sEvents = 1;
          html += '<div class="td markable" data-key="spot_'+c+'_'+ci+'_'+s+'" style="flex: '+sEvents+';">' + (spot.name || '') + '</div>';
        }
        html += '</div>';

        html += '<div class="col-group w-event">';
        for (var s = 0; s < city.spots.length; s++) {
          for (var e = 0; e < city.spots[s].events.length; e++) {
            var ev = city.spots[s].events[e];
            html += '<div class="td markable event-cell" data-key="e_'+ev.rowIdx+'">' + (ev.e||'') + '</div>';
          }
        }
        html += '</div>';

        html += '<div class="col-group w-sticker">';
        for (var s = 0; s < city.spots.length; s++) {
          for (var e = 0; e < city.spots[s].events.length; e++) {
            var ev = city.spots[s].events[e];
            html += '<div class="td markable '+(ev.st?'':'empty-cell')+'" data-key="st_'+ev.rowIdx+'">' + (ev.st||'') + '</div>';
          }
        }
        html += '</div>';

        var timeCols = ['day', 'dusk', 'night'];
        var timeChars = ['昼', '暮', '夜'];
        var timeWidths = ['w-day', 'w-dusk', 'w-night'];
        for (var t = 0; t < 3; t++) {
          html += '<div class="col-group '+timeWidths[t]+'">';
          for (var s = 0; s < city.spots.length; s++) {
            for (var e = 0; e < city.spots[s].events.length; e++) {
              var ev = city.spots[s].events[e];
              var has = (ev.t||'').indexOf(timeChars[t]) !== -1;
              html += '<div class="td markable '+(has?'':'empty-cell')+'" data-key="'+timeCols[t]+'_'+ev.rowIdx+'">' + (has?timeChars[t]:'') + '</div>';
            }
          }
          html += '</div>';
        }

        html += '<div class="col-group w-weather">';
        for (var s = 0; s < city.spots.length; s++) {
          for (var e = 0; e < city.spots[s].events.length; e++) {
            var ev = city.spots[s].events[e];
            html += '<div class="td markable '+(ev.w?'':'empty-cell')+'" data-key="w_'+ev.rowIdx+'">' + (ev.w||'') + '</div>';
          }
        }
        html += '</div>';

        html += '</div>';
      }
    }

    tbody.innerHTML = html;
    tableCard.scrollTop = 0; 
    
    allMarkable = [];
    var tds = tbody.querySelectorAll('.markable');
    for (var k = 0; k < tds.length; k++) {
      var td = tds[k];
      allMarkable.push(td);
      var key = td.getAttribute('data-key');
      if (key && doneSet[key]) addClass(td, 'done');
      
      if (!td._bound) {
        td._bound = true;
        td.addEventListener('touchstart', function(e) {
          var touch = e.touches[0];
          touchStartX = touch.clientX;
          touchStartY = touch.clientY;
        }, {passive: true});

        td.addEventListener('click', function (e) {
          if (e.changedTouches && e.changedTouches[0]) {
            var touch = e.changedTouches[0];
            var dx = Math.abs(touch.clientX - touchStartX);
            var dy = Math.abs(touch.clientY - touchStartY);
            if (dx > 10 || dy > 10) return; 
          }
          
          e.stopPropagation(); 
          if (selectedTd === this) {
            removeClass(this, 'selected');
            selectedTd = null;
          } else {
            if (selectedTd) removeClass(selectedTd, 'selected');
            addClass(this, 'selected');
            selectedTd = this;
          }
          updateButtons();
        });
      }
    }
  }

  function addClass(el, c) { if (!el) return; if((' '+el.className+' ').indexOf(' '+c+' ')===-1) el.className += ' '+c; }
  function removeClass(el, c) { if (!el) return; el.className = (' '+el.className+' ').replace(new RegExp('\\s+'+c+'\\s+','g'),' ').trim(); }
  function hasClass(el, c) { if (!el) return false; return (' '+el.className+' ').indexOf(' '+c+' ')!==-1; }

  function updateProgress() {
    var done = 0, total = 0;
    var trs = tbody.getElementsByTagName('div');
    for(var i=0; i<trs.length; i++) {
      if (!hasClass(trs[i], 'tr-row') || trs[i].style.display === 'none') continue;
      var tds = trs[i].querySelectorAll('.markable');
      for(var j=0; j<tds.length; j++) {
        total++;
        if (hasClass(tds[j], 'done')) done++;
      }
    }
    if (progressEl) progressEl.innerHTML = '当前国家：<b>'+done+'</b> / '+total+' 项';
  }

  function updateButtons() {
    if (!btnDone || !btnUndone) return;
    if (!selectedTd) { btnDone.disabled = true; btnUndone.disabled = true; return; }
    var isDone = hasClass(selectedTd, 'done');
    btnDone.disabled = isDone;
    btnUndone.disabled = !isDone;
  }

  if (btnDone) btnDone.addEventListener('click', function () {
    if (!selectedTd) return;
    var k = selectedTd.getAttribute('data-key');
    if (!k) return;
    doneSet[k] = true; saveDone();
    addClass(selectedTd, 'done'); removeClass(selectedTd, 'selected'); selectedTd = null;
    updateButtons(); updateProgress();
  });

  if (btnUndone) btnUndone.addEventListener('click', function () {
    if (!selectedTd) return;
    var k = selectedTd.getAttribute('data-key');
    if (!k) return;
    delete doneSet[k]; saveDone();
    removeClass(selectedTd, 'done'); removeClass(selectedTd, 'selected'); selectedTd = null;
    updateButtons(); updateProgress();
  });

  if (btnReset) btnReset.addEventListener('click', function () {
    if (typeof confirm === 'function' && !confirm('确定清空当前国家的进度吗？')) return;
    var trs = tbody.getElementsByTagName('div');
    for(var i=0; i<trs.length; i++) {
      if (!hasClass(trs[i], 'tr-row') || trs[i].style.display === 'none') continue;
      var tds = trs[i].querySelectorAll('.markable');
      for(var j=0; j<tds.length; j++) {
        var k = tds[j].getAttribute('data-key');
        if (k) delete doneSet[k];
        removeClass(tds[j], 'done'); removeClass(tds[j], 'selected');
      }
    }
    saveDone(); selectedTd = null;
    updateButtons(); updateProgress();
  });

  // ===== 唤出存档码 =====
  if (btnCode) {
    btnCode.addEventListener('click', function() {
      try {
        var jsonStr = JSON.stringify(doneSet);
        saveCodeInput.value = btoa(encodeURIComponent(jsonStr));
        codeOverlay.classList.add('show');
      } catch(e) { alert('生成存档码失败'); }
    });
  }

  // ===== 存档码操作 =====
  if (btnCloseCode) btnCloseCode.addEventListener('click', function() {
    codeOverlay.classList.remove('show');
  });

  if (btnCopyCode) {
    btnCopyCode.addEventListener('click', function() {
      if (!saveCodeInput.value) return;
      saveCodeInput.select();
      saveCodeInput.setSelectionRange(0, 99999);
      try {
        document.execCommand('copy');
        alert('复制成功！请妥善保存在备忘录或微信中。');
      } catch (err) {
        alert('复制失败，请手动长按文本复制。');
      }
    });
  }

  if (btnPasteCode) {
    btnPasteCode.addEventListener('click', function() {
      var code = saveCodeInput.value.trim();
      if (!code) { alert('请先在框内粘贴存档码！'); return; }
      try {
        var jsonStr = decodeURIComponent(atob(code));
        var obj = JSON.parse(jsonStr);
        if (typeof obj !== 'object') throw new Error('格式错误');
        
        doneSet = obj;
        localStorage.setItem(STORE_KEY, JSON.stringify(doneSet));
        
        buildFlexTable();
        updateProgress();
        updateButtons();
        
        codeOverlay.classList.remove('show');
        alert('导入成功！进度已恢复。');
      } catch (err) {
        alert('导入失败：存档码不正确或已损坏。');
      }
    });
  }

  // ===== 标签切换 =====
  if (tabsEl) {
    var tabs = tabsEl.getElementsByTagName('span');
    for (var t = 0; t < tabs.length; t++) {
      (function (tabEl, idx) {
        tabEl.addEventListener('click', function () {
          for (var j = 0; j < tabs.length; j++) removeClass(tabs[j], 'active');
          addClass(tabEl, 'active');
          currentCountry = COUNTRY_TABS[idx];
          
          var trs = tbody.getElementsByTagName('div');
          for (var i = 0; i < trs.length; i++) {
            if (!hasClass(trs[i], 'tr-row')) continue;
            var c = trs[i].getAttribute('data-country');
            trs[i].style.display = (c === currentCountry) ? '' : 'none';
          }
          tableCard.scrollTop = 0;
          if (selectedTd) { removeClass(selectedTd, 'selected'); selectedTd = null; }
          updateButtons(); updateProgress();
        });
      })(tabs[t], t);
    }
  }

  // ===== 图片生成 =====
  if (btnSave) btnSave.addEventListener('click', function () {
    var oldText = btnSave.innerText;
    btnSave.innerText = '生成中...';
    btnSave.disabled = true;

    setTimeout(function() {
      try {
        var targetCty = null;
        for (var i = 0; i < parsedCountries.length; i++) {
          if (parsedCountries[i].name === currentCountry) {
            targetCty = parsedCountries[i];
            break;
          }
        }
        if (!targetCty) throw new Error('找不到当前国家');

        var scale = 2; 
        var colWidths = [65, 110, 140, 75, 30, 30, 30, 50]; 
        var totalWidth = 0;
        for (var w = 0; w < colWidths.length; w++) totalWidth += colWidths[w];
        var rowHeight = 44;
        var headerHeight = 44;
        
        var totalRows = 0;
        for (var ci = 0; ci < targetCty.cities.length; ci++) {
          var city = targetCty.cities[ci];
          for (var s = 0; s < city.spots.length; s++) {
             totalRows += city.spots[s].events.length;
          }
        }
        if (totalRows === 0) totalRows = 1;

        var totalHeight = headerHeight + (totalRows * rowHeight) + 40; 

        var canvas = document.createElement('canvas');
        canvas.width = totalWidth * scale;
        canvas.height = totalHeight * scale;
        var ctx = canvas.getContext('2d');
        ctx.scale(scale, scale);

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, totalWidth, totalHeight);

        function drawText(text, x, y, w, h, isBold, color) {
          ctx.fillStyle = color || '#333333';
          ctx.font = (isBold ? 'bold ' : '') + '13px -apple-system, "PingFang SC", sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(text, x + w/2, y + h/2);
        }

        var headers = ['城市', '景点', '事件', '贴纸', '昼', '暮', '夜', '天气'];
        var cx = 0;
        ctx.fillStyle = '#fafafc';
        ctx.fillRect(0, 0, totalWidth, headerHeight);
        ctx.strokeStyle = '#efeff4';
        ctx.lineWidth = 1;
        
        for (var h = 0; h < headers.length; h++) {
          ctx.strokeRect(cx, 0, colWidths[h], headerHeight);
          drawText(headers[h], cx, 0, colWidths[h], headerHeight, true, '#6e6e73');
          cx += colWidths[h];
        }

        var currentY = headerHeight;
        
        for (var ci = 0; ci < targetCty.cities.length; ci++) {
          var city = targetCty.cities[ci];
          
          var cityEventCount = 0;
          for (var s = 0; s < city.spots.length; s++) cityEventCount += city.spots[s].events.length;
          if (cityEventCount === 0) cityEventCount = 1;
          var cityHeight = cityEventCount * rowHeight;

          ctx.strokeRect(0, currentY, colWidths[0], cityHeight);
          drawText(city.name || '', 0, currentY, colWidths[0], cityHeight, false, '#333');

          var spotStartY = currentY;

          for (var s = 0; s < city.spots.length; s++) {
            var spot = city.spots[s];
            var spotEventCount = spot.events.length;
            if (spotEventCount === 0) spotEventCount = 1;
            var spotHeight = spotEventCount * rowHeight;

            ctx.strokeRect(colWidths[0], spotStartY, colWidths[1], spotHeight);
            drawText(spot.name || '', colWidths[0], spotStartY, colWidths[1], spotHeight, false, '#333');

            for (var e = 0; e < spot.events.length; e++) {
              var ev = spot.events[e];
              var rowY = spotStartY + e * rowHeight;
              
              var isEvDone = doneSet['e_' + ev.rowIdx];
              var isStDone = doneSet['st_' + ev.rowIdx];
              var isDayDone = doneSet['day_' + ev.rowIdx];
              var isDuskDone = doneSet['dusk_' + ev.rowIdx];
              var isNightDone = doneSet['night_' + ev.rowIdx];
              var isWDone = doneSet['w_' + ev.rowIdx];
              
              ctx.strokeRect(colWidths[0]+colWidths[1], rowY, colWidths[2], rowHeight);
              if (isEvDone) { ctx.fillStyle = '#e8f8ec'; ctx.fillRect(colWidths[0]+colWidths[1], rowY, colWidths[2], rowHeight); }
              drawText(ev.e || '', colWidths[0]+colWidths[1], rowY, colWidths[2], rowHeight, false, isEvDone ? '#2e7d32' : '#333');

              ctx.strokeRect(colWidths[0]+colWidths[1]+colWidths[2], rowY, colWidths[3], rowHeight);
              if (isStDone) { ctx.fillStyle = '#e8f8ec'; ctx.fillRect(colWidths[0]+colWidths[1]+colWidths[2], rowY, colWidths[3], rowHeight); }
              drawText(ev.st || '', colWidths[0]+colWidths[1]+colWidths[2], rowY, colWidths[3], rowHeight, false, isStDone ? '#2e7d32' : '#333');

              var hasDay = (ev.t || '').indexOf('昼') !== -1;
              ctx.strokeRect(colWidths[0]+colWidths[1]+colWidths[2]+colWidths[3], rowY, colWidths[4], rowHeight);
              if (isDayDone) { ctx.fillStyle = '#e8f8ec'; ctx.fillRect(colWidths[0]+colWidths[1]+colWidths[2]+colWidths[3], rowY, colWidths[4], rowHeight); }
              drawText(hasDay ? '昼' : '', colWidths[0]+colWidths[1]+colWidths[2]+colWidths[3], rowY, colWidths[4], rowHeight, false, isDayDone ? '#2e7d32' : '#333');

              var hasDusk = (ev.t || '').indexOf('暮') !== -1;
              ctx.strokeRect(colWidths[0]+colWidths[1]+colWidths[2]+colWidths[3]+colWidths[4], rowY, colWidths[5], rowHeight);
              if (isDuskDone) { ctx.fillStyle = '#e8f8ec'; ctx.fillRect(colWidths[0]+colWidths[1]+colWidths[2]+colWidths[3]+colWidths[4], rowY, colWidths[5], rowHeight); }
              drawText(hasDusk ? '暮' : '', colWidths[0]+colWidths[1]+colWidths[2]+colWidths[3]+colWidths[4], rowY, colWidths[5], rowHeight, false, isDuskDone ? '#2e7d32' : '#333');

              var hasNight = (ev.t || '').indexOf('夜') !== -1;
              ctx.strokeRect(colWidths[0]+colWidths[1]+colWidths[2]+colWidths[3]+colWidths[4]+colWidths[5], rowY, colWidths[6], rowHeight);
              if (isNightDone) { ctx.fillStyle = '#e8f8ec'; ctx.fillRect(colWidths[0]+colWidths[1]+colWidths[2]+colWidths[3]+colWidths[4]+colWidths[5], rowY, colWidths[6], rowHeight); }
              drawText(hasNight ? '夜' : '', colWidths[0]+colWidths[1]+colWidths[2]+colWidths[3]+colWidths[4]+colWidths[5], rowY, colWidths[6], rowHeight, false, isNightDone ? '#2e7d32' : '#333');

              ctx.strokeRect(colWidths[0]+colWidths[1]+colWidths[2]+colWidths[3]+colWidths[4]+colWidths[5]+colWidths[6], rowY, colWidths[7], rowHeight);
              if (isWDone) { ctx.fillStyle = '#e8f8ec'; ctx.fillRect(colWidths[0]+colWidths[1]+colWidths[2]+colWidths[3]+colWidths[4]+colWidths[5]+colWidths[6], rowY, colWidths[7], rowHeight); }
              drawText(ev.w || '', colWidths[0]+colWidths[1]+colWidths[2]+colWidths[3]+colWidths[4]+colWidths[5]+colWidths[6], rowY, colWidths[7], rowHeight, false, isWDone ? '#2e7d32' : '#333');
            }
            spotStartY += spotHeight;
          }
          currentY += cityHeight;
        }

        ctx.fillStyle = '#b0b0b5';
        ctx.font = '11px -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('奇迹暖暖世界巡游 · ' + currentCountry + '进度', totalWidth / 2, currentY + 20);

        var dataUrl = canvas.toDataURL('image/png');
        imgPreview.src = dataUrl;
        imgOverlay.classList.add('show');

        btnSave.innerText = oldText; 
        btnSave.disabled = false;

      } catch (err) {
        console.error(err);
        alert('生成图片失败，请重试');
        btnSave.innerText = oldText; 
        btnSave.disabled = false;
      }
    }, 50);
  });

  if (imgClose) {
    imgClose.addEventListener('click', function() {
      imgOverlay.classList.remove('show');
      imgPreview.src = ''; 
    });
  }
  if (imgOverlay) {
    imgOverlay.addEventListener('click', function(e) {
      if (e.target === imgOverlay) {
        imgOverlay.classList.remove('show');
        imgPreview.src = '';
      }
    });
  }

  function saveDone() { try { localStorage.setItem(STORE_KEY, JSON.stringify(doneSet)); } catch(e){} }

  buildFlexTable();
  updateProgress();
  updateButtons();
})();