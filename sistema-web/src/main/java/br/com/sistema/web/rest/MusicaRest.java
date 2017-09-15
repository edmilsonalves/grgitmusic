package br.com.sistema.web.rest;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.fileupload.disk.DiskFileItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import br.com.sistema.web.entity.Artista;
import br.com.sistema.web.entity.Musica;
import br.com.sistema.web.exception.BusinessException;
import br.com.sistema.web.response.BaseResponse;
import br.com.sistema.web.service.IArtistaService;
import br.com.sistema.web.service.IMusicaService;
import br.com.sistema.web.util.SUtils;

/**
 * API REST para controle do cadastro de musicas
 *
 * @author edmilson.reis
 *
 */
@RestController
@RequestMapping("/rest")
public class MusicaRest {

	@Autowired
	private IMusicaService musicaService;

	@Autowired
	private IArtistaService artistaService;

	/**
	 * REST pesquisa musicas conforme pesquisa na tela
	 *
	 * @param query
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value = "/musicas/pesquisa", method = RequestMethod.GET)
	public ResponseEntity<?> pesquisa(@RequestParam(required = false) String query) {
		BaseResponse response = new BaseResponse();

		try {

			List<Musica> list = new ArrayList<Musica>();

			if (!SUtils.isNullOrEmpty(query)) {
				list = this.musicaService.findByNomeMusicaContaining(query);
			} else {
				list = this.musicaService.findAll();
			}

			response.setDataList(list);
			response.setTypeError(SUtils.E_USER_SUCESS);
			response.setMessage("Consulta realizada com sucesso.");
		} catch (BusinessException e) {
			response.setError(true);
			response.setTypeError(SUtils.E_USER_WARNING);
			response.setMessage(e.getMessage());
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	/**
	 * REST Busca musica ao clikar no link para edição
	 *
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/musicas/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> buscar(@PathVariable("id") Long id) {
		BaseResponse response = new BaseResponse();

		try {

			Musica musica = this.musicaService.findBy(id);
			response.setEntity(musica);

		} catch (BusinessException e) {
			response.setError(true);
			response.setTypeError(SUtils.E_USER_WARNING);
			response.setMessage(e.getMessage());
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	/**
	 * REST salva a musica ao clikar no bt salvar
	 *
	 * @param musica
	 * @return
	 */
	@RequestMapping(value = "/musicas", method = RequestMethod.POST)
	public ResponseEntity<?> save(@RequestPart(value = "musica") Musica musica,
			@RequestPart(value = "file", required = false) MultipartFile arquivo) {
		BaseResponse response = new BaseResponse();

		try {

			if(!SUtils.isNull(arquivo)){
				String nomeNovoArquivo = SUtils.dataToNomeImg(new Date(), arquivo.getOriginalFilename());
				saveFile(musica, arquivo, nomeNovoArquivo);
				musica.setNomeArquivo(nomeNovoArquivo);
			}

			this.musicaService.save(musica);
			response.setEntity(musica);
			response.setDataList(this.musicaService.findAll());
			response.setTypeError(SUtils.E_USER_SUCESS);
			response.setMessage("Operação realizada com sucesso.");

		} catch (Exception e) {
			response.setError(true);
			response.setTypeError(SUtils.E_USER_WARNING);
			response.setMessage(e.getMessage());
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	/**
	 * REST exclui musica ao clikar no icone de exclusão
	 *
	 * @param id
	 * @return
	 */
	@CrossOrigin
	@ResponseBody
	@RequestMapping(value = "/musicas/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> delete(@PathVariable("id") Long id) {
		BaseResponse response = new BaseResponse();

		try {
			this.musicaService.delete(id);
			response.setDataList(this.musicaService.findAll());
			response.setTypeError(SUtils.E_USER_SUCESS);
			response.setMessage("Operação realizada com sucesso.");
		} catch (Exception e) {
			response.setTypeError(SUtils.E_USER_WARNING);
			response.setMessage(e.getMessage());
			e.printStackTrace();
		}

		return ResponseEntity.ok(response);
	}

	/**
	 * REST pesquisa artistas conforme pesquisa na tela
	 *
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value = "/musicas/artistas", method = RequestMethod.GET)
	public ResponseEntity<?> artistaList() {
		BaseResponse response = new BaseResponse();

		try {

			response.setDataList(this.artistaService.findAll());
			return ResponseEntity.status(HttpStatus.OK).body(response);
		} catch (BusinessException e) {
			response.setError(true);
			response.setTypeError(SUtils.E_USER_WARNING);
			response.setMessage(e.getMessage());
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	/**
	 * REST salva o artista ao clikar no bt ADD
	 *
	 * @param artista
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value = "/musicas/artistas", method = RequestMethod.POST)
	public ResponseEntity<?> saveArtista(@RequestBody Artista artista) {
		BaseResponse response = new BaseResponse();

		try {

			this.artistaService.save(artista);
			response.setDataList(this.artistaService.findAll());
			response.setTypeError(SUtils.E_USER_SUCESS);
			response.setMessage("Operação realizada com sucesso.");

		} catch (Exception e) {
			response.setError(true);
			response.setTypeError(SUtils.E_USER_WARNING);
			response.setMessage(e.getMessage());
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	/**
	 * REST exclui artista ao clikar no icone de exclusão
	 *
	 * @param id
	 * @return
	 */
	@CrossOrigin
	@ResponseBody
	@RequestMapping(value = "/musicas/artistas/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteArtista(@PathVariable("id") Long id) {
		BaseResponse response = new BaseResponse();

		try {
			this.artistaService.delete(id);
			response.setDataList(this.artistaService.findAll());
			response.setTypeError(SUtils.E_USER_SUCESS);
			response.setMessage("Operação realizada com sucesso.");
		} catch (Exception e) {
			response.setError(true);
			response.setTypeError(SUtils.E_USER_WARNING);
			response.setMessage(e.getMessage());
			e.printStackTrace();
		}

		return ResponseEntity.ok(response);
	}


	/**
	 * salva o arquivo na pasta C:\grgitmusic, caso a pasta não exista será criada antes de gravar
	 *
	 * @param musica
	 * @param arquivo
	 * @param nomeNovoArquivo
	 * @throws IOException
	 */
	private void saveFile(Musica musica, MultipartFile arquivo, String nomeNovoArquivo) throws IOException {


		if (!SUtils.isNull(musica)) {

			String path = "C:\\grgitmusic";

			if (!SUtils.isNull(musica.getId())) {
				if (!SUtils.isNullOrEmpty(musica.getNomeArquivo())) {
					File fileRemove = new File(path, musica.getNomeArquivo());
					fileRemove.delete();
				}
			}

			File fileNew = new File(path, nomeNovoArquivo);

			if (!SUtils.isNull(fileNew) && !fileNew.getParentFile().exists())
				fileNew.getParentFile().mkdirs();

			if (!SUtils.isNull(fileNew) && !fileNew.exists()) {
				arquivo.transferTo(fileNew);
				musica.setPathArquivo("C:\\grgitmusic"+ "\\"+nomeNovoArquivo);
			}
		}
	}

}
