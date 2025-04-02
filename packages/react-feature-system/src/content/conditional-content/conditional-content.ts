import { Condition, ContentItem, executeCondition } from '@vyuh/react-core';

/**
 * A case item that pairs a condition value with its corresponding content.
 */
export interface CaseContentItem {
  /**
   * The value to match against the condition result
   */
  readonly value?: string;

  /**
   * The content to display when this case matches
   */
  readonly item?: ContentItem;
}

export const CONDITIONAL_CONTENT_SCHEMA_TYPE = 'vyuh.conditional';

/**
 * A content item that conditionally displays different content based on a condition.
 */
export interface ConditionalContent extends ContentItem {
  /**
   * The schema type for this content item
   */
  readonly schemaType: typeof CONDITIONAL_CONTENT_SCHEMA_TYPE;

  /**
   * The condition to evaluate
   */
  readonly condition?: Condition;

  /**
   * The cases to match against the condition result
   */
  readonly cases?: CaseContentItem[];

  /**
   * The default case to use if no cases match
   */
  readonly defaultCase?: string;
}

/**
 * Evaluate the condition and return the appropriate content
 */
export async function evaluateConditionalContent(
  content: ConditionalContent,
): Promise<ContentItem | null> {
  if (!content.condition || !content.cases) return null;

  const value = (await executeCondition(content.condition)) || content.defaultCase;
  const caseItem = content.cases?.find((x) => x.value === value);

  return Array.isArray(caseItem?.item) && caseItem.item.length > 0
    ? caseItem.item[0]
    : null;
}
