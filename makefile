test:
	@mocha -R list
	@make commit
commit:
	@git add .
	@git commit -am"auto-commit `date`" || :
.PHONY:test commit