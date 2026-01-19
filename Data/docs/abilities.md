# Abilities

* [Excel](/dictionary/30.1/excel/abilities.html)
* [Text](/dictionary/30.1/text/abilities.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/abilities.html)
* [Oracle](/dictionary/30.1/oracle/abilities.html)

| **Purpose:** | Provide a mapping of O*NET-SOC codes (occupations) to Ability ratings. |
| **Table Name:** | abilities |
| **Download:** | [11_abilities.sql](/dl_files/database/db_30_1_mysql/11_abilities.sql) |

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

This file contains the Content Model Ability data associated with each O*NET-SOC occupation. It is displayed in 12 tab delimited fields and identified using the column names provided above. Item rating level metadata is provided in columns named n, standard_error, lower_ci_bound, upper_ci_bound, recommend_suppress, not_relevant, date_updated, and domain_source. Refer to **[Appendix 1, *Item Rating Level Statistics - Analyst*](appendix_analyst.html "Appendix 1. Item Rating Level Statistics - Analyst")** for additional information on these items. The 12 fields are represented by one row. There are a total of 92,976 rows of data in this file.

For more information, see:
* [O*NET Analyst Occupational Ratings: Linkage Revisit](https://www.onetcenter.org/reports/LinkageRevisit.html)
* [O*NET Analyst Occupational Abilities Ratings: Procedures Update](https://www.onetcenter.org/reports/AnalystProcUpdate.html)
* [Updating Occupational Ability Profiles with O*NET Content Model Descriptors](https://www.onetcenter.org/reports/UpdateOAP.html)
* [Linking Client Assessment Profiles to O*NET Occupational Profiles Within the O*NET Ability Profiler](https://www.onetcenter.org/reports/AP_Linking.html)

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 5.0 | Date and Source columns added |
| 5.1 | Columns added for N, Standard Error, Lower CI Bound, Upper CI Bound, Recommend Suppress, and Not Relevant |
| 6.0 - 28.1 | No structure changes |
| 28.2 | Standard Error, Lower CI Bound, Upper CI Bound expanded from 2 decimal places to 4 |
| 28.3 - 30.1 | No structure changes |

### Data Example - abilities:

| onetsoc_code | element_id | scale_id | data_value | n | standard_error | lower_ci_bound | upper_ci_bound | recommend_suppress | not_relevant | date_updated | domain_source |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 53-3051.00 | 1.A.1.a.1 | IM | 3.25 | 8 | 0.1637 | 2.9292 | 3.5708 | N | NULL | 2025-08-01 | Analyst |
| 53-3051.00 | 1.A.1.a.1 | LV | 3.38 | 8 | 0.1830 | 3.0164 | 3.7336 | N | N | 2025-08-01 | Analyst |
| 53-3051.00 | 1.A.1.a.2 | IM | 2.75 | 8 | 0.1637 | 2.4292 | 3.0708 | N | NULL | 2025-08-01 | Analyst |
| 53-3051.00 | 1.A.1.a.2 | LV | 3.00 | 8 | 0.0000 | 3.0000 | 3.0000 | N | N | 2025-08-01 | Analyst |
| 53-3051.00 | 1.A.1.a.3 | IM | 3.12 | 8 | 0.1250 | 2.8800 | 3.3700 | N | NULL | 2025-08-01 | Analyst |
| 53-3051.00 | 1.A.1.a.3 | LV | 3.12 | 8 | 0.1250 | 2.8800 | 3.3700 | N | N | 2025-08-01 | Analyst |
| 53-3051.00 | 1.A.1.a.4 | IM | 2.75 | 8 | 0.1637 | 2.4292 | 3.0708 | N | NULL | 2025-08-01 | Analyst |
| 53-3051.00 | 1.A.1.a.4 | LV | 2.75 | 8 | 0.1637 | 2.4292 | 3.0708 | N | N | 2025-08-01 | Analyst |