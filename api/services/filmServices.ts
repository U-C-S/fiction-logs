import { film, PrismaClient, profile } from "@prisma/client";
import { IFilm } from "../types/IFilm";
import { IQuery } from "../types/IQuery";

const prisma = new PrismaClient();

export async function getFilms(profilename: string, is_watched: boolean = true): Promise<film[]> {
	return await prisma.film.findMany({
		where: {
			AND: [
				{
					profile: { name: { equals: profilename } },
					is_watched: { equals: is_watched },
				},
			],
		},
	});
}

export async function checkFilm(profilename: string, filmId: number) {
	const film = await prisma.film.findFirstOrThrow({
		where: {
			AND: [
				{
					profile: { name: { equals: profilename } },
					id: { equals: filmId },
				},
			],
		},
	});

	return film;
}

export async function createFilm(
	profilename: string,
	film: IFilm
): IQuery<{
	id: number;
	name: string;
}> {
	try {
		let x = await prisma.film.create({
			data: {
				name: film.name,
				is_watched: film.is_watched,
				comment: film.comment,
				rating: film.is_watched ? film.rating : null,
				watched_on: film.is_watched ? film.watched_on : null,
				profile: {
					connect: { name: profilename },
				},
			},
			select: {
				id: true,
				name: true,
			},
		});

		return {
			success: true,
			data: x,
		};
	} catch (error: any) {
		return {
			success: false,
			message: error.message,
		};
	}
}

export async function updateFilm(film: IFilm): IQuery<null> {
	// maybe use prisma.$queryRaw
	try {
		await prisma.film.update({
			where: {
				id: film.id,
			},
			data: {
				name: film.name,
				is_watched: film.is_watched,
				comment: film.comment,
				rating: film.is_watched ? film.rating : null,
				watched_on: film.is_watched ? film.watched_on : null,
			},
		});

		return {
			success: true,
			data: null,
		};
	} catch (error: any) {
		return {
			success: false,
			message: error.message,
		};
	}
}