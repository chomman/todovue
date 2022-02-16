/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { UserDTO } from './user.dto';

/**
 * A TodoDTO object.
 */
export class TodoDTO extends BaseDTO {
    @IsNotEmpty()
    @ApiModelProperty({ description: 'title field' })
    title: string;

    @ApiModelProperty({ description: 'done field', required: false })
    done: boolean;

    @ApiModelProperty({ type: UserDTO, description: 'user relationship' })
    user: UserDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
