const fs = require("fs");
const petik = '```';
let setting = JSON.parse(fs.readFileSync('./config.json'))
const { 
    getLimit, 
    getBalance, 
    cekGLimit 
} = require("./lib/limit")
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

function toCommas(x) {
    x = x.toString()
    var pattern = /(-?\d+)(\d{3})/;
     while (pattern.test(x))
       x = x.replace(pattern, "$1,$2");
    return x;
}

exports.allMenu = (role, ucapanWaktu, pushname, mundur, upload, download, ownerName, botName, jam, tanggal, runtime, isCreator, isPremium, sender, limitCount, limit, gcount, glimit, balance, prefix) => {
    return`${ucapanWaktu} ${pushname !== undefined ? pushname : 'Kak'}

Hitung Mundur Idul Fitri 🌙 
${mundur}

*STATISTICS*
 • Upload : ${upload}
 • Downloads : ${download}

*BOT INFO*
 • Creator : ${ownerName}
 • Bot Name : ${botName}
 • Time : ${jam}
 • Date : ${tanggal(new Date())}
 • Runtime : ${runtime(process.uptime())}

*USER INFO*
 • Name : ${pushname !== undefined ? pushname : '-'}
 • Status : ${isCreator ? 'Owner' : isPremium ? 'Premium' : 'Free'}
 • Limit : ${isCreator ? 'Unlimited' : isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)}
 • Limit Game : ${isCreator ? 'Unlimited' : cekGLimit(sender, gcount, glimit)}
 • Balance : ${getBalance(sender, balance)}
 • Role : ${role}
${readmore}
*MAIN MENU*${petik}
 • ${prefix}menu
 • ${prefix}infobot
 • ${prefix}donate
 • ${prefix}dashboard
 • ${prefix}owner
 • ${prefix}cekdrive
 • ${prefix}cekbandwidth
 • ${prefix}cekpremium
 • ${prefix}listpremium
 • ${prefix}listsewa
 • ${prefix}speed
 • ${prefix}runtime
 • ${prefix}listbahasa${petik}

*CONVERTER/TOOLS*${petik} 
 • ${prefix}sticker
 • ${prefix}qc
 • ${prefix}stickerwm
 • ${prefix}smeme
 • ${prefix}tourl
 • ${prefix}toimg
 • ${prefix}tomp3
 • ${prefix}remini
 • ${prefix}ttp
 • ${prefix}attp
 • ${prefix}emojimix
 • ${prefix}ai
 • ${prefix}aiimg
 • ${prefix}aidraw
 • ${prefix}chatgpt
 • ${prefix}nuliskiri
 • ${prefix}nuliskanan
 • ${prefix}foliokiri
 • ${prefix}foliokanan
 • ${prefix}say
 • ${prefix}translate${petik}

*ANONYMOUS CHATS*${petik}
 • ${prefix}menfess
 • ${prefix}confess
 • ${prefix}balasmenfess
 • ${prefix}tolakmenfess
 • ${prefix}stopmenfess
 • ${prefix}anonymous
 • ${prefix}start
 • ${prefix}next
 • ${prefix}stop
 • ${prefix}sendprofile${petik}

*STORE MENU*${petik}
 • ${prefix}list
 • ${prefix}addlist
 • ${prefix}dellist
 • ${prefix}update
 • ${prefix}jeda
 • ${prefix}tambah
 • ${prefix}kurang
 • ${prefix}kali
 • ${prefix}bagi
 • ${prefix}delsetdone
 • ${prefix}changedone
 • ${prefix}setdone
 • ${prefix}delsetproses
 • ${prefix}changeproses
 • ${prefix}setproses
 • proses <reply chat>
 • done <reply chat>${petik}

*RPG GAMES*${petik}
 • ${prefix}inventory
 • ${prefix}mining
 • ${prefix}buy 
 • ${prefix}sell
 • ${prefix}heal
 • ${prefix}hunt
 • ${prefix}adventure
 • ${prefix}luckyday
 • ${prefix}killslime
 • ${prefix}killgoblin
 • ${prefix}killdevil
 • ${prefix}killbehemoth
 • ${prefix}killdemon
 • ${prefix}killdemonking
 • ${prefix}joinrpg
 • ${prefix}sellikan
 • ${prefix}sellbesi
 • ${prefix}sellemas
 • ${prefix}jelajah
 • ${prefix}mancing
 • ${prefix}jualikan
 • ${prefix}jualcoal
 • ${prefix}lebur
 • ${prefix}jualstone
 • ${prefix}jualingot
 • ${prefix}jualkayu
 • ${prefix}nebang
 • ${prefix}goplanet
 • ${prefix}jualbahankimia${petik}

*DOWNLOADS MENU*${petik}
 • ${prefix}play
 • ${prefix}ytmp3
 • ${prefix}ytmp4
 • ${prefix}instagram
 • ${prefix}igphoto
 • ${prefix}igvideo
 • ${prefix}igreels
 • ${prefix}tiktok
 • ${prefix}tiktoknowm
 • ${prefix}tiktokaudio
 • ${prefix}mediafire
 • ${prefix}gitclone
 • ${prefix}capcut${petik}

*GROUP MENU*${petik}
 • ${prefix}autoaigc
 • ${prefix}afk
 • ${prefix}welcome
 • ${prefix}left
 • ${prefix}pppanjanggc
 • ${prefix}setopen
 • ${prefix}changesetopen
 • ${prefix}delsetopen
 • ${prefix}setclose
 • ${prefix}changesetclose
 • ${prefix}delsetclose
 • ${prefix}setwelcome
 • ${prefix}changewelcome
 • ${prefix}delsetwelcome
 • ${prefix}setleft
 • ${prefix}changeleft
 • ${prefix}delsetleft
 • ${prefix}linkgc
 • ${prefix}setppgc
 • ${prefix}setnamegc
 • ${prefix}setdesc
 • ${prefix}antilink
 • ${prefix}antiwame
 • ${prefix}open
 • ${prefix}close
 • ${prefix}add
 • ${prefix}kick
 • ${prefix}promote
 • ${prefix}demote
 • ${prefix}revoke
 • ${prefix}hidetag
 • ${prefix}checksewa${petik}

*GAME MENU*${petik}
 • ${prefix}tebakgambar
 • ${prefix}tebakkata
 • ${prefix}tebakbendera
 • ${prefix}tebakkalimat
 • ${prefix}tebaksiapa
 • ${prefix}tebakkimia
 • ${prefix}tebaklirik
 • ${prefix}tebaktebakan
 • ${prefix}tekateki
 • ${prefix}susunkata
 • ${prefix}tictactoe
 • ${prefix}delttt
 • ${prefix}casino
 • ${prefix}delcasino${petik}

*SEARCH MENU*${petik}
 • ${prefix}lirik
 • ${prefix}grupwa
 • ${prefix}pinterest
 • ${prefix}ytsearch
 • ${prefix}otakudesu${petik}

*RANDOM MENU*${petik}
 • ${prefix}cecan
 • ${prefix}cogan
 • ${prefix}waifu${petik}

*BALANCE MENU*${petik}
 • ${prefix}topglobal
 • ${prefix}toplocal
 • ${prefix}buylimit
 • ${prefix}buyglimit
 • ${prefix}transfer
 • ${prefix}limit
 • ${prefix}balance${petik}

*STORAGE*${petik}
 • ${prefix}addstik
 • ${prefix}addvn
 • ${prefix}addimg
 • ${prefix}addvid
 • ${prefix}delstik
 • ${prefix}delvn
 • ${prefix}delimg
 • ${prefix}delvid
 • ${prefix}liststik
 • ${prefix}listvn
 • ${prefix}listimg
 • ${prefix}listvid${petik}
 
*BAILEYS*${petik}
 • ${prefix}fitnah
 • ${prefix}nowa
 • ${prefix}getquoted
 • ${prefix}fakehidetag
 • ${prefix}react
 • ${prefix}setcmd
 • ${prefix}delcmd${petik}

*OWNERS MENU*${petik}
 • ${prefix}autoaipc
 • ${prefix}autoread
 • ${prefix}autobio
 • ${prefix}antidelete
 • ${prefix}antiviewonce
 • ${prefix}autorespond
 • ${prefix}anticall
 • ${prefix}autoblok212
 • ${prefix}join
 • ${prefix}left
 • ${prefix}self
 • ${prefix}public
 • ${prefix}setppbot
 • ${prefix}broadcast
 • ${prefix}bcimg
 • ${prefix}bcstik
 • ${prefix}bcvn
 • ${prefix}bcvideo
 • ${prefix}bcsewa
 • ${prefix}addpremium
 • ${prefix}delpremium
 • ${prefix}addsewa
 • ${prefix}delsewa
 • ${prefix}jadibot
 • ${prefix}listjadibot
 • ${prefix}stopjadibot${petik}

*ASUPAN MENU*${petik}
 • ${prefix}chika
 • ${prefix}delvira
 • ${prefix}ayu
 • ${prefix}bunga
 • ${prefix}aura
 • ${prefix}nisa
 • ${prefix}ziva
 • ${prefix}yana
 • ${prefix}viona
 • ${prefix}syania
 • ${prefix}riri
 • ${prefix}syifa
 • ${prefix}mama_gina
 • ${prefix}alcakenya
 • ${prefix}mangayutri
 • ${prefix}rikagusriani
 • ${prefix}asupan
 • ${prefix}bocil
 • ${prefix}geayubi
 • ${prefix}santuy
 • ${prefix}ukhty
 • ${prefix}syifa${petik}

*NSFW MENU*${petik}
 • ${prefix}baka
 • ${prefix}smug
 • ${prefix}neko_sfw
 • ${prefix}hentai_gif
 • ${prefix}spank
 • ${prefix}blowjob
 • ${prefix}cumarts
 • ${prefix}eroyuri
 • ${prefix}eroneko
 • ${prefix}erokemonomimi
 • ${prefix}erokitsune
 • ${prefix}ero
 • ${prefix}feet
 • ${prefix}erofeet
 • ${prefix}feetgif
 • ${prefix}femdom
 • ${prefix}futanari
 • ${prefix}hentai
 • ${prefix}holoero
 • ${prefix}holo
 • ${prefix}keta
 • ${prefix}kitsune
 • ${prefix}kemonomimi
 • ${prefix}pussyart
 • ${prefix}pussywankgif
 • ${prefix}girl_solo
 • ${prefix}girl_solo_gif
 • ${prefix}tits
 • ${prefix}trap
 • ${prefix}yuri
 • ${prefix}avatar2
 • ${prefix}anal
 • ${prefix}bj
 • ${prefix}boobs
 • ${prefix}classic
 • ${prefix}cumsluts
 • ${prefix}kuni
 • ${prefix}lesbian
 • ${prefix}neko
 • ${prefix}neko_gif
 • ${prefix}ahegao
 • ${prefix}bdsm
 • ${prefix}cuckold
 • ${prefix}cum
 • ${prefix}foot
 • ${prefix}gangbang
 • ${prefix}glasses
 • ${prefix}jahy
 • ${prefix}masturbation
 • ${prefix}nsfw_neko
 • ${prefix}orgy
 • ${prefix}panties
 • ${prefix}tentacles
 • ${prefix}thighs
 • ${prefix}zettai${petik}
`.trim();
}

exports.donate = (pushname, ownerNumber) => {
    return`Contact  Owner:
wa.me/${ownerNumber} (Owner)`
}

exports.sewanya = `Untuk List Sewa ubah sendiri di folder command, file help.js 👌 baris ke 521`