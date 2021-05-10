const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')
const ms = require('ms')

module.exports = {
    commands: 'slowmode',
    cooldown: 5,
    callback: (client, message, args) => {
        if(message.member.hasPermission('MANAGE_CHANNELS')){
            if(args[0] === 'channel'){ //!sm channel [channelid] [time]
                const channelId = args[1]
                const time = args[2]
    
                if(!channelId) {
                    const embed = new MessageEmbed()
                    .setDescription(`${config.emojis.no} Please specify a channelID to set slowmode of!`)
                    .setColor('RED')
                    .setFooter(config.botname)
                    .setTimestamp()
                    return message.channel.send(embed).then((message) => {
                        message.delete({
                            timeout: 5000
                        })
                    })
                }
    
                if(!time) {
                    const embed = new MessageEmbed()
                    .setDescription(`${config.emojis.no} Please specify a time to set slowmode!\nEx., 1s, 5s, 30m, 6h, etc.`)
                    .setColor('RED')
                    .setFooter(config.botname)
                    .setTimestamp()
                    return message.channel.send(embed).then((message) => {
                        message.delete({
                            timeout: 5000
                        })
                    })
                }
    
                message.guild.channels.cache.setRateLimitPerUser(ms(time))
                const embed = new MessageEmbed()
                .setDescription(`${config.emojis.yes} Successfully set slowmode of <#${channelId}> as ${time}`)
                .setColor('GREEN')
                .setFooter(config.botname)
                .setTimestamp()
                message.channel.send(embed).then((message) => {
                    message.delete({
                        timeout: 5000
                    })
                })
                message.delete()
    
                const logembed = new MessageEmbed()
                .setTitle('Channel Slowmode Changed!')
                .setColor('GREEN')
                .setFooter(config.botname)
                .setTimestamp()
                .addFields(
                    {
                        name: 'Action',
                        value: 'Slowmode Changed',
                    },
                    {
                        name: 'Moderator',
                        value: `${message.author.tag} (<@${message.author.id}>)`,
                    },
                    {
                        name: 'Channel',
                        value: `<#${channelId}>`
                    },
                    {
                        name: 'Time',
                        value: time,
                    }
                )
                channel.send(logembed)
    
    
            } else { //!sm [time]
                const time = args[0]
    
                if(!time) {
                    const embed = new MessageEmbed()
                    .setDescription(`${config.emojis.no} Please specify a time to set slowmode!\nEx., 1s, 5s, 30m, 6h, etc.`)
                    .setColor('RED')
                    .setFooter(config.botname)
                    .setTimestamp()
                    return message.channel.send(embed).then((message) => {
                        message.delete({
                            timeout: 5000
                        })
                    })
                }
    
                message.guild.channels.cache.setRateLimitPerUser(ms(time))
                const embed = new MessageEmbed()
                .setDescription(`${config.emojis.yes} Successfully set slowmode of this channel as ${time}`)
                .setColor('GREEN')
                .setFooter(config.botname)
                .setTimestamp()
                message.channel.send(embed).then((message) => {
                    message.delete({
                        timeout: 5000
                    })
                })
                message.delete()
    
                const logembed = new MessageEmbed()
                .setTitle('Channel Slowmode Changed!')
                .setColor('GREEN')
                .setFooter(config.botname)
                .setTimestamp()
                .addFields(
                    {
                        name: 'Action',
                        value: 'Slowmode Changed',
                    },
                    {
                        name: 'Moderator',
                        value: `${message.author.tag} (<@${message.author.id}>)`,
                    },
                    {
                        name: 'Channel',
                        value: `<#${message.channel.id}>`
                    },
                    {
                        name: 'Time',
                        value: time,
                    }
                )
                channel.send(logembed)
            }
        } else {
            const embed = new MessageEmbed()
            .setDescription(`${config.emojis.no} You don't have permissions to use this command!`)
            .setColor('RED')
            .setFooter(config.botname)
            .setTimestamp()
            return message.channel.send(embed).then((message) => {
                message.delete({
                    timeout: 5000
                })
            })
        }
    }
}