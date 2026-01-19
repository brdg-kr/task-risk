# Knowledge

* [Excel](/dictionary/30.1/excel/knowledge.html)
* [Text](/dictionary/30.1/text/knowledge.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/knowledge.html)
* [Oracle](/dictionary/30.1/oracle/knowledge.html)

| **Purpose:** | Provide a mapping of O*NET-SOC codes (occupations) to Knowledge ratings. |
| **Table Name:** | knowledge |
| **Download:** | [15_knowledge.sql](/dl_files/database/db_30_1_mysql/15_knowledge.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| onetsoc_code | Character(10) | O*NET-SOC Code *(see [*Occupation Data*](occupation_data.html "Occupation Data"))* |
| element_id | Character Varying(20) | Content Model Outline Position *(see [*Content Model Reference*](content_model_reference.html "Content Model Reference"))* |
| scale_id | Character Varying(3) | Scale ID *(see [*Scales Reference*](scales_reference.html "Scales Reference"))* |
| data_value | Decimal(5,2) | Rating associated with the O*NET-SOC occupation |
| n | Decimal(4,0) | Sample size |
| standard_error | Decimal(7,4) | Standard Error |
| lower_ci_bound | Decimal(7,4) | Lower 95% confidence interval bound |
| upper_ci_bound | Decimal(7,4) | Upper 95% confidence interval bound |
| recommend_suppress | Character(1) | Low precision indicator (Y=yes, N=no) |
| not_relevant | Character(1) | Not relevant for the occupation (Y=yes, N=no) |
| date_updated | Date | Date when data was updated |
| domain_source | Character Varying(30) | Source of the data |

This file contains the Content Model Knowledge data associated with each O*NET-SOC occupation. It is displayed in 12 tab delimited fields and identified using the column names provided above. Item rating level metadata is provided in columns named n, standard_error, lower_ci_bound, upper_ci_bound, recommend_suppress, not_relevant, date_updated, and domain_source. Refer to **[Appendix 2, *Item Rating Level Statistics - Incumbent*](appendix_incumbent.html "Appendix 2. Item Rating Level Statistics - Incumbent")** for additional information on these items. The 12 fields are represented by one row. There are a total of 59,004 rows of data in this file.

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 5.0 | Date and Source columns added |
| 5.1 | Columns added for N, Standard Error, Lower CI Bound, Upper CI Bound, Recommend Suppress, and Not Relevant |
| 6.0 - 28.1 | No structure changes |
| 28.2 | Standard Error, Lower CI Bound, Upper CI Bound expanded from 2 decimal places to 4 |
| 28.3 - 30.1 | No structure changes |

### Data Example - knowledge:

| onetsoc_code | element_id | scale_id | data_value | n | standard_error | lower_ci_bound | upper_ci_bound | recommend_suppress | not_relevant | date_updated | domain_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 29-2011.00 | 2.C.8.b | IM | 2.52 | 28 | 0.2879 | 1.9275 | 3.1090 | N | NULL | 2025-08-01 | Incumbent |
| 29-2011.00 | 2.C.8.b | LV | 2.47 | 28 | 0.4408 | 1.5705 | 3.3792 | N | N | 2025-08-01 | Incumbent |
| 29-2011.00 | 2.C.9.a | IM | 2.30 | 28 | 0.1504 | 1.9912 | 2.6086 | N | NULL | 2025-08-01 | Incumbent |
| 29-2011.00 | 2.C.9.a | LV | 1.64 | 28 | 0.3761 | 0.8672 | 2.4105 | N | N | 2025-08-01 | Incumbent |
| 29-2011.00 | 2.C.9.b | IM | 1.80 | 28 | 0.2181 | 1.3530 | 2.2482 | N | NULL | 2025-08-01 | Incumbent |
| 29-2011.00 | 2.C.9.b | LV | 1.46 | 28 | 0.4430 | 0.5467 | 2.3648 | N | N | 2025-08-01 | Incumbent |
| 29-2011.00 | 2.C.10 | IM | 1.75 | 27 | 0.1723 | 1.3918 | 2.1002 | N | NULL | 2025-08-01 | Incumbent |
| 29-2011.00 | 2.C.10 | LV | 1.28 | 27 | 0.2805 | 0.7064 | 1.8596 | N | N | 2025-08-01 | Incumbent |