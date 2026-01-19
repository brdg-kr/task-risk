# Skills

* [Excel](/dictionary/30.1/excel/skills.html)
* [Text](/dictionary/30.1/text/skills.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/skills.html)
* [Oracle](/dictionary/30.1/oracle/skills.html)

| **Purpose:** | Provide a mapping of O*NET-SOC codes (occupations) to Skill ratings. |
| **Table Name:** | skills |
| **Download:** | [16_skills.sql](/dl_files/database/db_30_1_mysql/16_skills.sql) |

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

This file contains the Content Model Skill data associated with each O*NET-SOC occupation. It is displayed in 12 tab delimited fields and identified using the column names provided above. Item rating level metadata is provided in columns named n, standard_error, lower_ci_bound, upper_ci_bound, recommend_suppress, not_relevant, date_updated, and domain_source. Refer to **[Appendix 1, *Item Rating Level Statistics - Analyst*](appendix_analyst.html "Appendix 1. Item Rating Level Statistics - Analyst")** for additional information on these items. The 12 fields are represented by one row. There are a total of 62,580 rows of data in this file.

For more information, see:
* [O*NET Analyst Occupational Skills Ratings: Procedures Update](https://www.onetcenter.org/reports/AOSkills_ProcUpdate.html)

### Data Example - skills:

| onetsoc_code | element_id | scale_id | data_value | n | standard_error | lower_ci_bound | upper_ci_bound | recommend_suppress | not_relevant | date_updated | domain_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 49-3041.00 | 2.A.1.a | IM | 3.00 | 8 | 0.0000 | 3.0000 | 3.0000 | N | NULL | 2025-08-01 | Analyst |
| 49-3041.00 | 2.A.1.a | LV | 2.88 | 8 | 0.1250 | 2.6300 | 3.1200 | N | N | 2025-08-01 | Analyst |
| 49-3041.00 | 2.A.1.b | IM | 3.12 | 8 | 0.1250 | 2.8800 | 3.3700 | N | NULL | 2025-08-01 | Analyst |
| 49-3041.00 | 2.A.1.b | LV | 3.00 | 8 | 0.0000 | 3.0000 | 3.0000 | N | N | 2025-08-01 | Analyst |
| 49-3041.00 | 2.A.1.c | IM | 2.88 | 8 | 0.1250 | 2.6300 | 3.1200 | N | NULL | 2025-08-01 | Analyst |
| 49-3041.00 | 2.A.1.c | LV | 2.62 | 8 | 0.1830 | 2.2664 | 2.9836 | N | N | 2025-08-01 | Analyst |
| 49-3041.00 | 2.A.1.d | IM | 3.12 | 8 | 0.1250 | 2.8800 | 3.3700 | N | NULL | 2025-08-01 | Analyst |
| 49-3041.00 | 2.A.1.d | LV | 3.00 | 8 | 0.0000 | 3.0000 | 3.0000 | N | N | 2025-08-01 | Analyst |