import {Field, ID, ObjectType} from '@nestjs/graphql';

@ObjectType('Task')
export class TaskType {
    @Field(type => ID)
    id: string;

    @Field(type => Date)
    order: string;

    @Field()
    title: string;

    @Field()
    isDone: boolean ;

    @Field()
    mode: boolean;


}