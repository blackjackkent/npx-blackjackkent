#!/usr/bin/env node

"use strict";

const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require("inquirer");
const clear = require("clear");
const open = require("open");
const fs = require("fs");
const request = require("request");
const path = require("path");
const ora = require("ora");
const cliSpinners = require("cli-spinners");

clear();

//! importing User Data from data.json
const res = fs.readFileSync(path.resolve(__dirname, "data.json"));
const user_data = JSON.parse(res);
const {
	user_name,
	user_email,
	twitter_username,
	github_username,
	personal_site,
	discord,
	patreon,
	npx_card_handle,
	job_title,
} = user_data;

const prompt = inquirer.createPromptModule();

const questions = [
	{
		type: "list",
		name: "action",
		message: "What you want to do?",
		choices: [
			//// Send an email
			{
				name: `Send me an ${chalk.green.bold("email")}.`,
				value: () => {
					open(`mailto:${user_email}`);
					console.log("\nOpened in your mail client!\n");
				},
			},
			//// Join Discord
			{
				name: `Join my ${chalk.magentaBright.bold("Discord server")}.`,

				value: () => {
					open(`https://discord.com/invite/${discord}`);
					console.log("\nOpened in browser!\n");
				},
			},
			//// Quit
			{
				name: "Quit.",
				value: () => {
					console.log("Thanks for visiting!\n");
				},
			},
		],
	},
];

const data = {
	name: chalk.bold.blue(`               ${user_name}`),
	// work: `${chalk.white("Software Engineer at")} ${chalk.hex("#2b82b2").bold("ClearTax")}`,
	work: `    ${chalk.white(`${job_title}`)}`,
	twitter:
		chalk.gray("https://twitter.com/") + chalk.cyan(`${twitter_username}`),
	github: chalk.gray("https://github.com/") + chalk.green(`${github_username}`),
	web: `             ${chalk.cyan(`${personal_site}`)}`,
	discord:
		chalk.gray("https://discord.com/invite/") + chalk.magenta(`${discord}`),
	patreon: chalk.gray("https://www.patreon.com/") + chalk.red(`${patreon}`),
	npx: chalk.red("npx") + " " + chalk.white(`${npx_card_handle}`),

	labelWork: chalk.white.bold("       Work:"),
	labelTwitter: chalk.white.bold("    Twitter:"),
	labelGitHub: chalk.white.bold("     GitHub:"),
	labelDiscord: chalk.white.bold("    Discord:"),
	labelPatreon: chalk.white.bold("    Patreon:"),
	labelWeb: chalk.white.bold("        Web:"),
	labelCard: chalk.white.bold("       Card:"),
};

const me = boxen(
	[
		`${data.name}`,
		``,
		`${data.work}`,
		`${data.web}`,
		``,
		`${data.labelTwitter}  ${data.twitter}`,
		`${data.labelGitHub}  ${data.github}`,
		`${data.labelDiscord}  ${data.discord}`,
		`${data.labelPatreon}  ${data.patreon}`,
		``,
		`${data.labelCard}  ${data.npx}`,
		``,
		`${chalk.italic(
			"Hi, I'm Roz! I'm a software developer and content creator"
		)}`,
		`${chalk.italic("from Chicago, IL. I want to make software that makes")}`,
		`${chalk.italic("life better, and help you do the same!")}`,
		``,
		`${chalk.bold.white("Gaming and software dev weekly on Twitch: ")}`,
		`        ${chalk.bold.cyan("http://www.twitch.tv/blackjack_kent")}`,
		`${chalk.bold.white("Coding tutorials on TikTok: ")}`,
		`        ${chalk.bold.cyan("http://www.tiktok.com/@blackjackkent")}`,
	].join("\n"),
	{
		margin: 1,
		float: "center",
		padding: 1,
		borderStyle: "single",
		borderColor: "blue",
	}
);

console.log(me);

prompt(questions).then((answer) => answer.action());
