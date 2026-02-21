import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: () => new Date() })
  createdAt: Date;

  @Prop()
  deactivatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
