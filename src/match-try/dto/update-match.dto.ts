import { PartialType } from "@nestjs/mapped-types";

import { CreateMatchTryDto } from "./create-match-try.dto";

export class UpdateMatchDto extends PartialType(CreateMatchTryDto) {}
