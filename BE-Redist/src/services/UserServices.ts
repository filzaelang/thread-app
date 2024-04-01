import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Following } from "../entity/Following";
import { Repository, FindManyOptions, Like, Not } from "typeorm";

export default new class UserSevices {
    private readonly UserRepository: Repository<User> = AppDataSource.getRepository(User)
    private readonly FollowingRepository: Repository<Following> = AppDataSource.getRepository(Following);

    async find(reqBody: any, loginSession: any): Promise<object | string> {
        try {
            const user = await this.UserRepository.find({
                where: [
                    {
                        username: Like(`%${reqBody.username}%`),
                        id: Not(loginSession.obj.id)
                    },
                    {
                        full_name: Like(`%${reqBody.username}%`),
                        id: Not(loginSession.obj.id)
                    },
                ],
                take: 5,
            } as FindManyOptions<User>);

            return await Promise.all(
                user.map(async (data) => {
                    const isFollowed = await this.FollowingRepository.count({
                        where: {
                            follower_id: {
                                id: loginSession.obj.id,
                            },
                            following_id: {
                                id: data.id,
                            },
                        },
                    });

                    return {
                        id: data.id,
                        username: data.username,
                        full_name: data.full_name,
                        email: data.email,
                        photo_profile: data.photo_profile,
                        description: data.description,
                        follower: data.follower,
                        following: data.following,
                        is_followed: isFollowed > 0,
                    }
                })
            )

        } catch (error) {
            throw new Error(error.message);
        }
    }

    async findOne(id: number, loginSession: any): Promise<object | string> {
        try {
            const user = await this.UserRepository.findOne({
                where: { id },
                relations: ["follower", "following"],
            })

            return {
                id: user.id,
                username: user.username,
                full_name: user.full_name,
                email: user.email,
                photo_profile: user.photo_profile,
                description: user.description,
                follower: user.follower || [],
                following: user.following || [],
                followers_count: (user.follower || []).length,
                following_count: (user.following || []).length,
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getAll(): Promise<object | string> {
        try {
            const users = await this.UserRepository.find({
                relations: ["follower", "following"]
            })
            return users.map((data) => ({
                id: data.id,
                username: data.username,
                email: data.email,
                full_name: data.full_name,
                description: data.description,
                photo_profile: data.photo_profile,
                followers_count: data.following.length,
                following_count: data.follower.length,
            }))
        } catch (error) {
            throw new Error(error.message)
        }

    }

    async sugestedAccount(loginSession: any): Promise<object | string> {
        try {

            const users = await this.UserRepository.createQueryBuilder('user')
                .leftJoinAndSelect("user.following", "following")
                .leftJoinAndSelect("following.follower_id", "follower_id")
                .where('user.id != :userId', { userId: loginSession.obj.id })
                .getMany();

            const mappedData = users.filter((item) => {
                return !item.following.some(
                    (following) => following.follower_id.id == loginSession.obj.id
                )
            });

            const result = mappedData.slice(0, 2);

            return result.map((data) => ({
                id: data.id,
                username: data.username,
                full_name: data.full_name,
                email: data.email,
                photo_profile: data.photo_profile,
                description: data.description,
                is_followed: false,
            }))
        } catch (error) {
            throw new Error(error.message);
        }
    }
}