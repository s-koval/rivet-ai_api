import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config();

class ConfigsService {
  private getValue = (value: string, throwOnMissing = true): string => {
    if (!value && throwOnMissing) {
      throw new Error(`Config error: missing env.${value}`);
    }

    return value;
  };

  public getPort = (): string => {
    const { PORT } = process.env;

    return this.getValue(PORT, true);
  };

  public getTypeOrmConfig = (): TypeOrmModuleOptions => {
    const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

    return {
      type: 'mysql',
      host: this.getValue(DB_HOST),
      port: parseInt(this.getValue(DB_PORT)),
      username: this.getValue(DB_USER),
      password: this.getValue(DB_PASSWORD),
      database: this.getValue(DB_NAME),
      synchronize: true,
      autoLoadEntities: true,
    };
  };
}

export const configsService = new ConfigsService();
