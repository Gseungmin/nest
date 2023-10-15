import { IsNotEmpty } from 'class-validator';
import { ERRORS } from 'src/common/utils';

export class CreatePostDto {
  @IsNotEmpty({ message: ERRORS.TITLE_IS_EMPTY.message })
  title: string;

  @IsNotEmpty({ message: ERRORS.CONTENT_IS_EMPTY.message })
  content: string;
}
