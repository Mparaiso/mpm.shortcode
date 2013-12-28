test:
	@mocha -R list
	@make commit
commit:
	@git add .
	@git commit -am"auto-commit `date`" || :
push: commit
	@git push origin --all	
.PHONY:test commit