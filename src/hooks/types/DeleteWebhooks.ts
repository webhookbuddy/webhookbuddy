/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteWebhooksInput } from "./../../types/global-types";

// ====================================================
// GraphQL mutation operation: DeleteWebhooks
// ====================================================

export interface DeleteWebhooks_deleteWebhooks {
  __typename: "DeleteWebhooksPayload";
  affectedRows: number;
}

export interface DeleteWebhooks {
  deleteWebhooks: DeleteWebhooks_deleteWebhooks;
}

export interface DeleteWebhooksVariables {
  input: DeleteWebhooksInput;
}
