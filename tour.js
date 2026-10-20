(function () {
  var STORE_KEY = 'nn_world_tour_main';
  var selectedTd = null;
  var doneSet = {};
  var COUNTRY_TABS = ['苹果', '云端', '莉莉斯', '信鸽', '北地', '荒原'];

  try {
    var raw = localStorage.getItem(STORE_KEY);
    if (raw) doneSet = JSON.parse(raw);
  } catch(e){}

  var RAW_DATA = [
    { c:'苹果', ct:'卢索', s:'第六医疗所', e:'特工任务1', st:'黑框眼镜', t:'夜', w:'雨' },
    { c:'', ct:'', s:'', e:'恶魔医生的回忆', st:'', t:'', w:'' },
    { c:'', ct:'', s:'第八区', e:'特工任务2', st:'', t:'', w:'' },
    { c:'', ct:'', s:'', e:'误入第八区', st:'', t:'', w:'' },
    { c:'', ct:'', s:'秘影巷', e:'秘巷危情', st:'质感漆桶', t:'', w:'' },
    { c:'', ct:'', s:'挥金乐园', e:'特工任务3', st:'', t:'夜', w:'' },
    { c:'', ct:'', s:'', e:'逝去的乐园', st:'', t:'', w:'' },
    { c:'', ct:'威尔顿', s:'苏比露天影院', e:'光影之忆', st:'光影瞬间', t:'暮', w:'' },
    { c:'', ct:'', s:'城市广场', e:'索菲亚的演出2', st:'', t:'', w:'' },
    { c:'', ct:'', s:'', e:'设计前沿峰会', st:'', t:'', w:'' },
    { c:'', ct:'', s:'荷赛艺术街区', e:'美食之旅4', st:'', t:'', w:'' },
    { c:'', ct:'', s:'', e:'街区艺术', st:'', t:'', w:'' },
    { c:'', ct:'', s:'联邦服装集团', e:'恋人的幸福3', st:'', t:'', w:'' },
    { c:'', ct:'', s:'', e:'新品发布会', st:'', t:'', w:'' },
    { c:'', ct:'', s:'海克斯水族馆', e:'特色推荐', st:'无忧小鱼', t:'', w:'' },
    { c:'', ct:'', s:'真是果茶店', e:'奇妙搭配', st:'醇香奶茶', t:'昼 暮', w:'' },
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
    { c:'', ct:'圣西城', s:'布里克街', e:'时装风潮', st:'交易走势', t:'', w:'夜' },
    { c:'', ct:'', s:'时代之塔', e:'落日美景', st:'摩天大楼', t:'', w:'夜' },
    { c:'', ct:'', s:'菲利普实验室', e:'趣味实验', st:'实验时刻', t:'', w:'夜' },
    { c:'', ct:'', s:'天空之翼', e:'天使投资', st:'天使之翼', t:'', w:'夜' },
    { c:'', ct:'鲁尔特丹', s:'派阿罗歌剧院', e:'小寻与怪盗3', st:'', t:'', w:'' },
    { c:'', ct:'', s:'', e:'索菲亚的演出3', st:'', t:'', w:'' },
    { c:'', ct:'', s:'', e:'古典公主', st:'', t:'', w:'' },
    { c:'', ct:'', s:'鲁尔特丹博物馆', e:'小寻与怪盗2', st:'', t:'', w:'' },
    { c:'', ct:'', s:'', e:'特别的礼物', st:'', t:'', w:'' },
    { c:'', ct:'', s:'九日暮', e:'寻宝游戏1', st:'银杏叶', t:'', w:'' },
    { c:'', ct:'', s:'', e:'自信的搭配师', st:'', t:'', w:'' },
    { c:'', ct:'', s:'辛吉娅画室', e:'画意深谈', st:'缤纷画架', t:'昼', w:'' },
    { c:'', ct:'', s:'卡洛西音乐厅', e:'甜蜜交响乐', st:'', t:'暮', w:'' },
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
    { c:'', ct:'宁州城', s:'弦音溪', e:'溪音鸣玉', st:'蕴竹清流', t:'暮', w:'' },
    { c:'', ct:'', s:'香培茶室', e:'品茗逸事', st:'留香雅盏', t:'昼 夜', w:'' },
    { c:'', ct:'', s:'蕴芳园', e:'循芳引途', st:'芬芳悄驻', t:'暮 夜', w:'' },
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
    { c:'', ct:'', s:'云京大学堂', e:'云京大学堂', st:'学堂课本', t:'暮 夜', w:'' },
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
    { c:'', ct:'格尔维拉', s:'芙罗拉花市', e:'花之心语', st:'馨香一隅', t:'夜', w:'' },
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
    { c:'', ct:'', s:'恋心邮局', e:'情意慢递', st:'慕心邮筒', t:'', w:'' },
    { c:'', ct:'', s:'伦特庄园', e:'浪漫花海', st:'芳香郁金', t:'暮 夜', w:'' },
    { c:'', ct:'温特蒙', s:'米米特海湾', e:'海洋史丢丢', st:'', t:'', w:'雨' },
    { c:'', ct:'', s:'克里托度假村', e:'立风的歌', st:'', t:'暮', w:'雨' },
    { c:'', ct:'', s:'翡翡希洞窟', e:'薰风逐波', st:'馥郁满舟', t:'夜', w:'' },
    { c:'', ct:'', s:'山坡广场', e:'五花肉设计', st:'', t:'夜', w:'雨' },
    { c:'信鸽', ct:'迪尔诺德', s:'皮修斯玩具屋', e:'茸茸心事', st:'小熊', t:'', w:'' },
    { c:'', ct:'', s:'洛林德调香室', e:'妙手生香', st:'香水', t:'', w:'' },
    { c:'', ct:'', s:'米索庄园', e:'遥望远梦', st:'金丝眼镜', t:'', w:'' },
    { c:'', ct:'依米兰', s:'联合图书馆', e:'山中书馆', st:'智慧之鸟', t:'昼 暮 夜', w:'' },
    { c:'', ct:'', s:'亚洛斯观景台', e:'远眺风景', st:'遥望远方', t:'昼 暮 夜', w:'' },
    { c:'', ct:'', s:'帕拉斯桥', e:'赐慧之桥', st:'赐慧之水', t:'夜', w:'' },
    { c:'', ct:'', s:'新叶咖啡馆', e:'提神咖啡', st:'香醇咖啡', t:'', w:'' },
    { c:'', ct:'信鸽森林', s:'竖琴瀑布', e:'瀑布边的王子', st:'浪漫竖琴', t:'夜', w:'' },
    { c:'', ct:'', s:'石碑林', e:'巧遇拂苏', st:'神秘水晶', t:'', w:'' },
    { c:'', ct:'', s:'蘑菇栖所', e:'黛奥比的家', st:'蘑菇屋', t:'夜', w:'' },
    { c:'', ct:'海蒂小镇', s:'弗纳庄园', e:'牧场趣事', st:'可爱哞哞', t:'', w:'' },
    { c:'', ct:'', s:'馥馨花庭', e:'花间灵感', st:'飘香午茶', t:'昼 暮', w:'' },
    { c:'', ct:'', s:'克雷尔小屋', e:'醇香满屋', st:'赏味汤勺', t:'暮 夜', w:'' },
    { c:'', ct:'奥伦城', s:'罗莎莱艺术餐厅', e:'玫瑰奇遇', st:'弥香瓷碟', t:'', w:'' },
    { c:'', ct:'', s:'奥伦城市政厅', e:'误入餐厅', st:'荣耀盔甲', t:'', w:'' },
    { c:'', ct:'', s:'伦纳河', e:'夕阳河上', st:'河心小船', t:'暮 夜', w:'' },
    { c:'', ct:'', s:'蔷薇花园', e:'艾思的茶会', st:'蔷薇满园', t:'夜', w:'' },
    { c:'', ct:'', s:'普林提故居', e:'解说员奥兰多', st:'见字如面', t:'', w:'' },
    { c:'', ct:'', s:'伊希莉美术馆', e:'别样观览', st:'鎏金画框', t:'', w:'' },
    { c:'', ct:'南斯洛城', s:'希达亚电车餐厅', e:'美味特访', st:'列车模型', t:'', w:'' },
    { c:'', ct:'', s:'南斯洛飞艇站', e:'匆忙的黑卡', st:'飞空艇', t:'夜', w:'' },
    { c:'', ct:'', s:'记忆之芯', e:'疯狂购物', st:'记忆之芯', t:'', w:'' },
    { c:'', ct:'', s:'奥维尔艺术工厂', e:'机构与少女', st:'管道时钟', t:'', w:'雨' },
    { c:'', ct:'', s:'菲莉丝植物园', e:'午后绿荫', st:'清新绿意', t:'昼 暮 夜', w:'' },
    { c:'', ct:'伊普利多港', s:'伊普利码头', e:'南希的休闲时光', st:'豪华游轮', t:'夜', w:'' },
    { c:'', ct:'', s:'皇家灯塔', e:'灯塔鬼影', st:'皇家灯塔', t:'夜', w:'' },
    { c:'', ct:'', s:'蓝海公路', e:'海风拂面', st:'游嬉海鸥', t:'昼 夜', w:'' },
    { c:'', ct:'', s:'白银旋转餐厅', e:'伊莎的秘密', st:'日银烤肉', t:'', w:'' },
    { c:'北地', ct:'黑水城', s:'军事博物馆', e:'崇武之国', st:'乘风破浪', t:'', w:'' },
    { c:'', ct:'', s:'厄尔利亚滑雪场', e:'客串教练', st:'梦幻缆车', t:'夜', w:'' },
    { c:'', ct:'', s:'爱德维亚剧场', e:'魔法时间', st:'缤纷剧场', t:'', w:'' },
    { c:'', ct:'', s:'西莫雪地温泉', e:'暖意融融', st:'冰山摆件', t:'夜', w:'' },
    { c:'', ct:'', s:'玻昂冰淇淋工厂', e:'沁凉之法', st:'沁甜霜球', t:'夜', w:'' },
    { c:'', ct:'日石城', s:'自由之塔', e:'高塔的倒影', st:'自由之塔', t:'夜', w:'' },
    { c:'', ct:'', s:'尤妮金娜广场', e:'自由庆典', st:'冰风战歌', t:'暮', w:'' },
    { c:'', ct:'', s:'安塔斯马场', e:'驰骋的马儿', st:'千里良驹', t:'夜', w:'' },
    { c:'', ct:'', s:'时光钟表店', e:'钟表馆的影子', st:'鎏金怀表', t:'夜', w:'' },
    { c:'', ct:'哈罗德', s:'艾汀陶艺坊', e:'陶艺初体验', st:'手作陶瓷', t:'夜', w:'' },
    { c:'', ct:'', s:'天空之镜', e:'星星的礼物', st:'雪原小屋', t:'暮 夜', w:'' },
    { c:'', ct:'', s:'博格峡谷', e:'峭壁上的芭蕾', st:'澄明净水', t:'昼 暮 夜', w:'' },
    { c:'', ct:'墨尔多萨', s:'火炬广场', e:'庆典摊位', st:'', t:'暮 夜', w:'' },
    { c:'', ct:'', s:'冰舟餐厅', e:'美食推荐', st:'', t:'', w:'' },
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
    { c:'', ct:'', s:'古丽法后院', e:'布料展览', st:'轻柔织布', t:'夜', w:'' },
    { c:'', ct:'', s:'帐篷餐厅', e:'异域舞娘', st:'烤肉大餐', t:'', w:'' },
    { c:'', ct:'风之渊', s:'崖可牧场', e:'繁星的指引', st:'雪日牦牛', t:'夜', w:'' },
    { c:'', ct:'', s:'圣焰峰', e:'会当凌绝顶', st:'圣焰峰', t:'', w:'' },
    { c:'', ct:'', s:'娜奇景观长廊', e:'自然的呼唤', st:'优雅杯盏', t:'', w:'' },
    { c:'', ct:'', s:'风息驿站', e:'游历四海', st:'斑斓彩灯', t:'夜', w:'' }
  ];

  var tbody = document.getElementById('tourBody');
  var parsedCountries = []; 

  function buildTable() {
    var currentCountryObj = null, currentCityObj = null, currentSpotObj = null, lastCountry = null;
    for (var i = 0; i < RAW_DATA.length; i++) {
      var r = RAW_DATA[i];
      if (r.c) { lastCountry = r.c; currentCountryObj = { name: r.c, cities: [] }; parsedCountries.push(currentCountryObj); currentCityObj = null; }
      if (r.ct) { if (!currentCountryObj) { currentCountryObj = { name: lastCountry, cities: [] }; parsedCountries.push(currentCountryObj); } currentCityObj = { name: r.ct, spots: [] }; currentCountryObj.cities.push(currentCityObj); currentSpotObj = null; }
      if (r.s) { if (!currentCityObj) { currentCityObj = { name: '', spots: [] }; currentCountryObj.cities.push(currentCityObj); } currentSpotObj = { name: r.s, events: [] }; currentCityObj.spots.push(currentSpotObj); }
      if (r.e || r.st || r.t || r.w) {
        if (!currentSpotObj) { if (!currentCityObj) { currentCityObj = { name: '', spots: [] }; currentCountryObj.cities.push(currentCityObj); } currentSpotObj = { name: '', events: [] }; currentCityObj.spots.push(currentSpotObj); }
        currentSpotObj.events.push({ rowIdx: i, e: r.e, st: r.st, t: r.t, w: r.w });
      }
    }

    var html = '';
    for (var c = 0; c < parsedCountries.length; c++) {
      var cty = parsedCountries[c];
      var isCurrent = (cty.name === '苹果'); // 默认显示苹果
      var trStyle = isCurrent ? '' : 'style="display:none;"';
      for (var ci = 0; ci < cty.cities.length; ci++) {
        var city = cty.cities[ci];
        html += '<div class="tr-row" data-country="' + cty.name + '" ' + trStyle + '>';
        html += '<div class="td w-city markable" data-key="city_'+c+'_'+ci+'">' + (city.name || '') + '</div>';
        html += '<div class="col-group w-spot">';
        for (var s = 0; s < city.spots.length; s++) {
          var sEvents = city.spots[s].events.length || 1;
          html += '<div class="td markable" data-key="spot_'+c+'_'+ci+'_'+s+'" style="flex: '+sEvents+';">' + (city.spots[s].name || '') + '</div>';
        }
        html += '</div>';
        var cols = [{k:'e', w:'w-event', cls:'event-cell'}, {k:'st', w:'w-sticker', cls:''}, {k:'day', w:'w-day', cls:''}, {k:'dusk', w:'w-dusk', cls:''}, {k:'night', w:'w-night', cls:''}, {k:'w', w:'w-weather', cls:''}];
        for (var colIdx = 0; colIdx < cols.length; colIdx++) {
          var colInfo = cols[colIdx];
          html += '<div class="col-group '+colInfo.w+'">';
          for (var s = 0; s < city.spots.length; s++) {
            for (var e = 0; e < city.spots[s].events.length; e++) {
              var ev = city.spots[s].events[e];
              var val = '', has = false;
              if (colInfo.k === 'e') { val = ev.e; has = !!val; }
              else if (colInfo.k === 'st') { val = ev.st; has = !!val; }
              else if (colInfo.k === 'w') { val = ev.w; has = !!val; }
              else { var char = colInfo.k==='day'?'昼':(colInfo.k==='dusk'?'暮':'夜'); has = (ev.t||'').indexOf(char) !== -1; val = has?char:''; }
              html += '<div class="td markable '+colInfo.cls+' '+(has?'':'empty-cell')+'" data-key="'+colInfo.k+'_'+ev.rowIdx+'">' + val + '</div>';
            }
          }
          html += '</div>';
        }
        html += '</div>';
      }
    }
    tbody.innerHTML = html;
    bindEvents();
  }

  function bindEvents() {
    var tds = tbody.querySelectorAll('.markable');
    for (var k = 0; k < tds.length; k++) {
      var td = tds[k];
      var key = td.getAttribute('data-key');
      if (key && doneSet[key]) td.className += ' done';
      td.addEventListener('click', function (e) {
        e.stopPropagation();
        var allSel = tbody.querySelectorAll('.selected');
        for(var i=0; i<allSel.length; i++) allSel[i].className = allSel[i].className.replace(/\s*selected/g, '');
        if (this.className.indexOf('selected') === -1) {
          this.className += ' selected';
          selectedTd = this;
        } else { selectedTd = null; }
        document.getElementById('btnDone').disabled = this.className.indexOf('done') !== -1;
        document.getElementById('btnUndone').disabled = this.className.indexOf('done') === -1;
      });
    }
  }

  function saveDone() { try { localStorage.setItem(STORE_KEY, JSON.stringify(doneSet)); } catch(e){} }
  function updateProgress() {
    var done = 0, total = 0, trs = tbody.querySelectorAll('.tr-row');
    for(var i=0; i<trs.length; i++) {
      if (trs[i].style.display === 'none') continue;
      var tds = trs[i].querySelectorAll('.markable');
      for(var j=0; j<tds.length; j++) { total++; if (tds[j].className.indexOf('done') !== -1) done++; }
    }
    document.getElementById('progressText').innerHTML = '当前国家：<b>'+done+'</b> / '+total+' 项';
  }

  // 初始化
  buildTable(); updateProgress();
  
  document.getElementById('btnDone').onclick = function() {
    if(!selectedTd) return; var k = selectedTd.getAttribute('data-key'); if(!k) return;
    doneSet[k] = true; saveDone(); selectedTd.className = selectedTd.className.replace(/\s*selected/g,'') + ' done'; selectedTd = null;
    this.disabled = true; document.getElementById('btnUndone').disabled = true; updateProgress();
  };
  document.getElementById('btnUndone').onclick = function() {
    if(!selectedTd) return; var k = selectedTd.getAttribute('data-key'); if(!k) return;
    delete doneSet[k]; saveDone(); selectedTd.className = selectedTd.className.replace(/\s*done/g,'').replace(/\s*selected/g,''); selectedTd = null;
    this.disabled = true; document.getElementById('btnDone').disabled = true; updateProgress();
  };
  document.getElementById('btnReset').onclick = function() {
    if(!confirm('确定清空当前国家的进度吗？')) return;
    var trs = tbody.querySelectorAll('.tr-row');
    for(var i=0; i<trs.length; i++) {
      if (trs[i].style.display === 'none') continue;
      var tds = trs[i].querySelectorAll('.markable');
      for(var j=0; j<tds.length; j++) { var k = tds[j].getAttribute('data-key'); if(k) delete doneSet[k]; tds[j].className = tds[j].className.replace(/\s*done/g,'').replace(/\s*selected/g,''); }
    }
    saveDone(); updateProgress();
  };
  
  var tabs = document.querySelector('.tabs').getElementsByTagName('span');
  for(var t=0; t<tabs.length; t++) {
    (function(tab, idx) {
      tab.onclick = function() {
        for(var j=0; j<tabs.length; j++) tabs[j].className = 'tab';
        this.className = 'tab active';
        var curC = ['苹果', '云端', '莉莉斯', '信鸽', '北地', '荒原'][idx];
        var trs = tbody.querySelectorAll('.tr-row');
        for(var i=0; i<trs.length; i++) trs[i].style.display = (trs[i].getAttribute('data-country') === curC) ? '' : 'none';
        updateProgress();
      };
    })(tabs[t], t);
  }

  // 存档码
  document.getElementById('btnCode').onclick = function() {
    document.getElementById('saveCodeInput').value = btoa(encodeURIComponent(JSON.stringify(doneSet)));
    document.getElementById('codeOverlay').className = 'show';
  };
  document.getElementById('btnCloseCode').onclick = function() { document.getElementById('codeOverlay').className = ''; };
  document.getElementById('btnPasteCode').onclick = function() {
    try {
      var val = document.getElementById('saveCodeInput').value.trim();
      if(!val) return;
      doneSet = JSON.parse(decodeURIComponent(atob(val)));
      localStorage.setItem(STORE_KEY, JSON.stringify(doneSet));
      document.getElementById('codeOverlay').className = '';
      buildTable(); updateProgress(); alert('导入成功！');
    } catch(e) { alert('存档码有误！'); }
  };
  document.getElementById('btnCopyCode').onclick = function() {
    var el = document.getElementById('saveCodeInput');
    el.select(); el.setSelectionRange(0, 99999);
    try { document.execCommand('copy'); alert('复制成功'); } catch(e) { alert('请长按框内文字手动复制'); }
  };
})();